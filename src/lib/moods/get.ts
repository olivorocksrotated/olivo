import { Mood } from '@prisma/client';

import { lastWeekFromTodayAtZeroHourUTC, monthsFirstDayAtZeroHourUTC, monthsLastDayAtMidnightUTC, todayAtMidnightUTC, todayAtZeroHourUTC } from '../date/days';
import prisma from '../prisma/client';

interface BetweenCreatedFilter{
    value: 'between';
    startDate: Date;
    endDate: Date;
}

interface Filter {
    created: 'last week' | 'last month' | 'this month' | BetweenCreatedFilter;
}

const defaultSelect = {
    id: true,
    status: true,
    comment: true,
    createdAt: true,
    ownerId: false
};

const isBetweenCreatedFilter = (createdFilter: any): createdFilter is BetweenCreatedFilter => createdFilter?.value === 'between';

export function getMoods({ userId, filters = {}, order = 'desc', select = defaultSelect }: {
    userId: string,
    filters?: Partial<Filter>,
    order?: 'asc' | 'desc',
    select?: { [K in keyof Mood]: boolean };
}) {
    const filtersBuilder = {
        ...filters.created === 'last week' ? { createdAt: { gte: lastWeekFromTodayAtZeroHourUTC() } } : {},
        ...filters.created === 'last month' ? { createdAt: { gte: monthsFirstDayAtZeroHourUTC(1), lt: monthsFirstDayAtZeroHourUTC() } } : {},
        ...filters.created === 'this month' ? { createdAt: { gte: monthsFirstDayAtZeroHourUTC(), lte: monthsLastDayAtMidnightUTC() } } : {},
        ...isBetweenCreatedFilter(filters.created) ? { createdAt: { gte: filters.created.startDate, lte: filters.created.endDate } } : {}
    };

    return prisma.mood.findMany({
        where: { ownerId: userId, ...filtersBuilder },
        select,
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
