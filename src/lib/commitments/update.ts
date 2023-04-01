import { CommitmentStatus } from '@prisma/client';

import prisma from '../prisma';

export function updateCommitmentStatus(commitmentId: string, updatedStatus: CommitmentStatus) {
    return prisma.commitment.update({
        where: { id: commitmentId },
        data: {
            status: updatedStatus
        }
    });
}
