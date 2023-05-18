import { lastWeekFromTodayAtZeroHourUTC, monthsFirstDayAtZeroHourUTC, monthsLastDayAtMidnightUTC, todayAtMidnightUTC, todayAtZeroHourUTC } from '../date/days';
import prisma from '../prisma';

interface Filter {
    created: 'last week' | 'last month' | 'this month';
}

const defaultSelect = {
    id: true,
    status: true,
    comment: true,
    createdAt: true
};

export function getMoods({ userId, filters, order = 'desc' }: {
    userId: string,
    filters?: Filter,
    order?: 'asc' | 'desc'
}) {
    const filtersBuilder = {
        ...filters?.created === 'last week' ? { createdAt: { gte: lastWeekFromTodayAtZeroHourUTC() } } : {},
        ...filters?.created === 'last month' ? { createdAt: { gte: monthsFirstDayAtZeroHourUTC(1), lt: monthsFirstDayAtZeroHourUTC() } } : {},
        ...filters?.created === 'this month' ? { createdAt: { gte: monthsFirstDayAtZeroHourUTC(), lte: monthsLastDayAtMidnightUTC() } } : {}
    };

    return prisma.mood.findMany({
        where: { ownerId: userId, ...filtersBuilder },
        select: defaultSelect,
        orderBy: { createdAt: order }
    });
}

export function getTodaysMood(userId: string) {
    return prisma.mood.findFirst({
        where: {
            ownerId: userId,
            createdAt: { gte: todayAtZeroHourUTC(), lt: todayAtMidnightUTC() }
        },
        select: defaultSelect
    });
}
