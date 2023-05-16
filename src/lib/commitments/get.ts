import { CommitmentStatus } from '@prisma/client';

import { todayAtMidnightUTC, todayAtZeroHourUTC } from '../date/days';
import prisma from '../prisma';

interface Filter {
    today: boolean;
}

export async function getCommitmentsByUser(userId: string, filters: Partial<Filter> = {}) {
    const filtersBuilder = {
        ...filters.today ? { doneBy: { gte: todayAtZeroHourUTC(), lt: todayAtMidnightUTC() } } : {}
    };

    const commitments = await prisma.commitment.findMany({
        where: {
            ownerId: userId,
            OR: [
                { status: CommitmentStatus.InProgress },
                { status: CommitmentStatus.Done },
                { status: CommitmentStatus.NotStartedYet }
            ],
            ...filtersBuilder
        },
        select: {
            id: true,
            title: true,
            status: true,
            doneBy: true
        },
        orderBy: {
            doneBy: 'asc'
        }
    });

    return commitments;
}
