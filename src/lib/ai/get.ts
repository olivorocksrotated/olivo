import { AiExecutionName } from '@prisma/client';

import { hashString } from '../hash/hash-string';
import prisma from '../prisma';
import { openAiClient } from './client';

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

export async function getStreamedAiResponse(userId: string, prompt: string) {
    return openAiClient.createChatCompletion({
        model: 'gpt-4',
        messages: [{ role: 'user', content: prompt }],
        stream: true,
        temperature: 1,
        user: hashString(userId)
    });
}
