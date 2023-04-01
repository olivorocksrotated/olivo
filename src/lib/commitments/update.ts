import { CommitmentStatus } from '@prisma/client';

import prisma from '../prisma';

export function updateCommitment(userId: string, commitmentId: string, { title, status, doneBy }: {
    title?: string,
    status?: CommitmentStatus
    doneBy?: Date
}) {
    return prisma.commitment.update({
        where: {
            id: commitmentId,
            ownerId: userId
        },
        data: {
            ...title ? { title } : {},
            ...status ? { status } : {},
            ...doneBy ? { doneBy } : {}
        }
    });
}
