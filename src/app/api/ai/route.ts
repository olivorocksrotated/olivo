import { AiExecutionName } from '@prisma/client';
import { OpenAIStream, StreamingTextResponse } from 'ai';
import { NextResponse } from 'next/server';
import { z } from 'zod';

import { createAiExecution } from '@/lib/ai/create';
import { getStreamedAiResponse } from '@/lib/ai/get';
import { getServerSession } from '@/lib/auth/session';
import { createMoodAdvicePrompt, createMoodSummaryPrompt } from '@/lib/moods/ai';

const executionPrompt: { [key in AiExecutionName]: (userId: string) => Promise<string> } = {
    [AiExecutionName.MoodSummary]: createMoodSummaryPrompt,
    [AiExecutionName.MoodAdvice]: createMoodAdvicePrompt
};

const aiSdkBodySchema = z.object({
    messages: z.array(z.object({ content: z.string() })),
    execution: z.nativeEnum(AiExecutionName)
});

export async function POST(req: Request) {
    const body = await req.json();
    const validation = aiSdkBodySchema.safeParse(body);
    if (!validation.success) {
        return NextResponse.json(
            { error: { name: 'Bad Request', issues: validation.error.issues } },
            { status: 400 }
        );
    }

    const { execution } = validation.data;
    const { user } = await getServerSession();
    const userId = user.id;

    const prompt = await executionPrompt[execution](userId);
    const response = await getStreamedAiResponse(userId, prompt);

    /* eslint-disable no-console */
    const traceId = `${userId}-${new Date().toISOString()}`;
    const stream = OpenAIStream(response, {
        onStart: async () => {
            console.debug('/api/chat - Stream started', { userId, traceId });
        },
        onCompletion: async (completion: string) => {
            console.debug('/api/chat - Stream completed', { userId, traceId });
            await createAiExecution({
                userId,
                executionName: execution,
                prompt,
                response: completion
            });
        }
    });

    return new StreamingTextResponse(stream, {
        headers: {
            'Content-Type': 'text/event-stream',
            'X-Content-Type-Options': 'nosniff'
        }
    });
}
