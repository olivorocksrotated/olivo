import { NotificationStatus } from '@prisma/client';

import prisma from '@/lib/prisma';

interface Filter {
    status: NotificationStatus;
}

export function getNotifications({ userId, filters = {}, order = 'desc' }: {
    userId: string,
    filters?: Partial<Filter>,
    order?: 'asc' | 'desc'
}) {
    const filtersBuilder = {
        ...filters.status ? { status: filters.status } : {}
    };

    return prisma.notification.findMany({
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
