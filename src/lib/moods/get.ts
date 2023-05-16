import { lastWeekFromTodayAtZeroHourUTC, todayAtMidnightUTC, todayAtZeroHourUTC } from '../date/days';
import prisma from '../prisma';

interface Filter {
    from: 'last week';
}

export function getMoods({ userId, filters, order = 'desc' }: {
    userId: string,
    filters?: Filter,
    order?: 'asc' | 'desc'
}) {
    const filtersBuilder = {
        ...filters?.from === 'last week' ? { createdAt: { gte: lastWeekFromTodayAtZeroHourUTC() } } : {}
    };

    return prisma.mood.findMany({
        where: {
            ownerId: userId,
            ...filtersBuilder
        },
        select: {
            id: true,
            status: true,
            comment: true,
            createdAt: true
        },
        orderBy: {
            createdAt: order
        }
    });
}

export function getTodaysMood(userId: string) {
    return prisma.mood.findFirst({
        where: {
            ownerId: userId,
            createdAt: { gte: todayAtZeroHourUTC(), lt: todayAtMidnightUTC() }
        },
        select: {
            id: true,
            status: true,
            comment: true,
            createdAt: true
        }
    });
}
