import { CommitmentStatus } from '@prisma/client';
import { add, sub } from 'date-fns';

import prisma from '../prisma';

interface Filter {
    today: boolean;
}

function getTodayFilter() {
    const today = new Date(new Date().setUTCHours(0, 0, 0, 0));
    const tomorrow = add(today, { days: 1 });
    const yesterday = sub(today, { days: 1 });

    return { gt: yesterday, lt: tomorrow };
}

export async function getCommitmentsByUser(userId: string, filters: Partial<Filter> = {}) {
    const filtersBuilder = {
        ...filters.today ? { doneBy: getTodayFilter() } : {}
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
