import { AiExecutionName } from '@prisma/client';

import prisma from '../prisma/client';

export function createAiExecution({ userId, executionName, prompt, response }: {
    userId: string,
    executionName: AiExecutionName,
    prompt: string,
    response: string
}) {
    return prisma.aiExecution.create({
        data: {
            ownerId: userId,
            executionName,
            prompt,
            response
        }
    });
}
