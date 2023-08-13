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
        const res = await aiClient.createChatCompletion({
            model: 'gpt-4',
            messages: [{ role: 'user', content: prompt }]
        });

        const aiResponse = res.data.choices[0].message?.content;
        if (!aiResponse) {
            throw new Error('The AI did not produce any answer');
        }

        return aiResponse;
    } catch (error: any) {
        const errorMessage = error.response ? `${error.response.status - error.response.data}` : error.message;
        throw new Error(errorMessage);
    }
}
