import { CommitmentStatus } from '@prisma/client';

import { todayAtMidnightUTC, todayAtZeroHourUTC } from '../date/days';
import prisma from '../prisma';

interface Filter {
    doneBy: 'today' | 'next' | 'overdue';
    status: 'to-do' | 'resolved' | 'not-abandoned'
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
    const filtersBuilder = {
        ...filters.doneBy === 'today' ? { doneBy: { gte: todayAtZeroHourUTC(), lt: todayAtMidnightUTC() } } : {},
        ...filters.doneBy === 'next' ? { doneBy: { gt: todayAtZeroHourUTC() } } : {},
        ...filters.doneBy === 'overdue' ? { doneBy: { lt: todayAtZeroHourUTC() } } : {},
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
