import { AiExecutionName } from '@prisma/client';

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
        const response = await aiClient.createChatCompletion({
            model: 'gpt-4',
            messages: [{ role: 'user', content: prompt }]
        });

        return response.data.choices[0].message?.content ?? 'We could not get an answer';
    } catch (error: any) {
        const errorMessage = error.response ? `${error.response.status - error.response.data}` : error.message;
        throw new Error(errorMessage);
    }
}
