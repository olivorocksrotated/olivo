import { lastWeekFromTodayAtZeroHourUTC } from '../date/days';
import prisma from '../prisma';

interface Filter {
    from: 'last week';
}

export function getMoods(userId: string, filters: Filter) {
    const filtersBuilder = {
        ...filters.from === 'last week' ? { createdAt: lastWeekFromTodayAtZeroHourUTC() } : {}
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

export function getLatestMood(userId: string) {
    return prisma.mood.findFirst({
        where: {
            ownerId: userId
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
