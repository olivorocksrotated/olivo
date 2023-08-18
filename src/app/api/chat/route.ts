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
}).refine(
    ({ messages, execution }) => messages[0].content === execution,
    { message: 'The execution name must match' }
);

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
    const traceId = `${userId}-${new Date}`;
    const stream = OpenAIStream(response, {
        onStart: async () => {
            console.debug('/api/chat - Stream started', { userId, prompt, traceId });
        },
        onToken: async (token: string) => {
            console.debug('/api/chat - Token received', { userId, token, traceId });
        },
        onCompletion: async (completion: string) => {
            console.debug('/api/chat - Stream completed', { userId, completion, traceId });
            await createAiExecution({
                userId,
                executionName: execution,
                prompt,
                response: completion
            });
        }
    });

    return new StreamingTextResponse(stream);
}
