import { CommitmentStatus } from '@prisma/client';
import { sub } from 'date-fns';

import { todayAtMidnightUTC, todayAtZeroHourUTC } from '../date/days';
import prisma from '../prisma';

interface Filter {
    doneBy: 'today' | 'today and last 2 days';
    status: 'to-do'
}

type OrderDirection = 'asc' | 'desc';
interface Order {
    doneBy: OrderDirection;
    createdAt: OrderDirection;
}

export async function getCommitments({ userId, filters = {}, order }: {
    userId: string,
    filters?: Partial<Filter>,
    order?: Partial<Order>
}) {
    const defaultStatusQuery = {
        OR: [
            { status: CommitmentStatus.InProgress },
            { status: CommitmentStatus.Done },
            { status: CommitmentStatus.NotStartedYet }
        ]
    };

    const filtersBuilder = {
        ...filters.doneBy === 'today' ? { doneBy: { gte: todayAtZeroHourUTC(), lt: todayAtMidnightUTC() } } : {},
        ...filters.doneBy === 'today and last 2 days' ? { doneBy: { gte: sub(todayAtZeroHourUTC(), { days: 2 }), lt: todayAtMidnightUTC() } } : {},
        ...filters.status === 'to-do' ? {
            OR: [
                { status: CommitmentStatus.InProgress },
                { status: CommitmentStatus.NotStartedYet }
            ]
        } : defaultStatusQuery
    };

    const commitments = await prisma.commitment.findMany({
        where: {
            ownerId: userId,
            ...filtersBuilder
        },
        select: {
            id: true,
            title: true,
            status: true,
            doneBy: true
        },
        ...order ? { orderBy: order } : {}
    });

    return commitments;
}
