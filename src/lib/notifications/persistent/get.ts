import { NotificationStatus } from '@prisma/client';

import prisma from '@/lib/prisma/client';

interface Filter {
    status: NotificationStatus;
}

export function getNotifications({ userId, filters = {}, order = 'desc', take = 30 }: {
    userId: string,
    filters?: Partial<Filter>,
    order?: 'asc' | 'desc'
    take?: number
}) {
    const filtersBuilder = {
        ...filters.status ? { status: filters.status } : {}
    };

    return prisma.notification.findMany({
        take,
        where: { ownerId: userId, ...filtersBuilder },
        select: {
            id: true,
            title: true,
            payload: true,
            type: true,
            status: true,
            createdAt: true
        },
        orderBy: { createdAt: order }
    });
}
