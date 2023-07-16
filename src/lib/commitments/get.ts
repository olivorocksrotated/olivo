import { CommitmentStatus } from '@prisma/client';
import { sub } from 'date-fns';

import { todayAtMidnightUTC, todayAtZeroHourUTC, tomorrowAtZeroHourUTC } from '../date/days';
import prisma from '../prisma';

interface Filter {
    doneBy: 'today' | 'next' | 'overdue' | 'last 4 weeks';
    status: 'to-do' | 'resolved' | 'not-abandoned';
}

type OrderDirection = 'asc' | 'desc';
interface Order {
    doneBy: OrderDirection;
    createdAt: OrderDirection;
}

const filtersBuilder = (filters: Partial<Filter>) => ({
    ...filters.doneBy === 'today' ? { doneBy: { gte: todayAtZeroHourUTC(), lt: todayAtMidnightUTC() } } : {},
    ...filters.doneBy === 'next' ? { doneBy: { gt: todayAtZeroHourUTC() } } : {},
    ...filters.doneBy === 'overdue' ? { doneBy: { lt: todayAtZeroHourUTC() } } : {},
    ...filters.doneBy === 'last 4 weeks' ? { doneBy: { lt: tomorrowAtZeroHourUTC(), gte: sub(todayAtZeroHourUTC(), { weeks: 4 }) } } : {},
    ...filters.status === 'not-abandoned' ? {
        OR: [
            { status: CommitmentStatus.InProgress },
            { status: CommitmentStatus.Done },
            { status: CommitmentStatus.NotStartedYet }
        ]
    } : {},
    ...filters.status === 'to-do' ? {
        OR: [
            { status: CommitmentStatus.InProgress },
            { status: CommitmentStatus.NotStartedYet }
        ]
    } : {},
    ...filters.status === 'resolved' ? {
        OR: [
            { status: CommitmentStatus.Done },
            { status: CommitmentStatus.Abandoned }
        ]
    } : {}
});

export async function getCommitments({ userId, filters = {}, order, take }: {
    userId: string,
    filters?: Partial<Filter>,
    order?: Partial<Order>,
    take?: number
}) {
    const commitments = await prisma.commitment.findMany({
        where: {
            ownerId: userId,
            ...filtersBuilder(filters)
        },
        select: {
            id: true,
            title: true,
            status: true,
            description: true,
            doneBy: true,
            doneAt: true
        },
        ...order ? { orderBy: order } : {},
        ...take ? { take } : {}
    });

    return commitments;
}
