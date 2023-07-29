import { AiExecutionId } from '@prisma/client';

import prisma from '../prisma';

export function getAiExecution(executionId: AiExecutionId, createdAfter: Date) {
    return prisma.aiExecution.findFirst({
        where: {
            executionId,
            createdAt: { gte: createdAfter }
        }
    });
}
