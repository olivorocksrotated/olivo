import { AiExecutionName } from '@prisma/client';
import { OpenAIStream, StreamingTextResponse } from 'ai';
import { NextResponse } from 'next/server';
import { z } from 'zod';

import { getStreamedAiResponse } from '@/lib/ai/get';
import { getServerSession } from '@/lib/auth/session';
import { createMoodAdvicePrompt, createMoodSummaryPrompt } from '@/lib/moods/ai';

const executionPrompt: { [key in AiExecutionName]: (userId: string) => Promise<string> } = {
    [AiExecutionName.MoodSummary]: createMoodSummaryPrompt,
    [AiExecutionName.MoodAdvice]: createMoodAdvicePrompt
};

const aiSdkBodySchema = z.object({
    messages: z.tuple([z.object({ content: z.nativeEnum(AiExecutionName) })])
});

export async function POST(req: Request) {
    const validation = aiSdkBodySchema.safeParse(await req.json());
    if (!validation.success) {
        return NextResponse.json(
            { error: { name: 'Bad Request', issues: validation.error.issues } },
            { status: 400 }
        );
    }

    const { messages } = validation.data;
    const { content: name } = messages[0];
    const { user } = await getServerSession();

    const prompt = await executionPrompt[name](user.id);
    const response = await getStreamedAiResponse(prompt);
    const stream = OpenAIStream(response);

    return new StreamingTextResponse(stream);
}
