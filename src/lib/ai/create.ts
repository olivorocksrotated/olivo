import { AiExecutionName } from '@prisma/client';

import prisma from '../prisma';

export function createAiExecution({ userId, executionName, response }: {
    userId: string,
    executionName: AiExecutionName,
    response: string
}) {
    return prisma.aiExecution.create({
        data: {
            ownerId: userId,
            executionName,
            response
        }
    });
}
