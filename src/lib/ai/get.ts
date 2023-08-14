import { AiExecutionName } from '@prisma/client';
import { ChatCompletionChunk } from 'openai/resources/chat';
import { Stream } from 'openai/streaming';

import prisma from '../prisma';
import { aiClient } from './client';

export function getAiExecution({ userId, executionName, createdAfter }: {
    userId: string,
    executionName: AiExecutionName,
    createdAfter: Date
}) {
    return prisma.aiExecution.findFirst({
        where: {
            ownerId: userId,
            executionName,
            createdAt: { gte: createdAfter }
        }
    });
}

export async function getAiResponse(prompt: string): Promise<string> {
    try {
        const res = await aiClient.chat.completions.create({
            model: 'gpt-4',
            messages: [{ role: 'user', content: prompt }]
        });

        const aiResponse = res.choices[0].message?.content;
        if (!aiResponse) {
            throw new Error('The AI did not produce any answer');
        }

        return aiResponse;
    } catch (error: any) {
        const errorMessage = error.response ? `${error.response.status - error.response.data}` : error.message;
        throw new Error(errorMessage);
    }
}

export async function getStreamedAiResponse(prompt: string): Promise<Stream<ChatCompletionChunk>> {
    return aiClient.chat.completions.create({
        model: 'gpt-4',
        messages: [{ role: 'user', content: prompt }],
        stream: true
    });
}
