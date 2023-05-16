import { lastWeekFromTodayAtZeroHourUTC, todayAtMidnightUTC, todayAtZeroHourUTC } from '../date/days';
import prisma from '../prisma';

interface Filter {
    from: 'last week';
}

export function getMoods(userId: string, filters: Filter) {
    const filtersBuilder = {
        ...filters.from === 'last week' ? { createdAt: { gte: lastWeekFromTodayAtZeroHourUTC() } } : {}
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
            createdAt: 'desc'
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
