'use server';

import { NotificationStatus } from '@prisma/client';
import { revalidatePath } from 'next/cache';

import { action } from '@/lib/server-actions/safe-action-client';
import { emptyValidator } from '@/lib/validators/empty';

import { getServerSession } from '../../auth/session';
import prisma from '../../prisma/client';

export async function updateNotificationsStatus({ userId, status, notificationIds }: {
    userId: string,
    status: NotificationStatus,
    notificationIds?: string[]
}) {
    return prisma.notification.updateMany({
        where: {
            ownerId: userId,
            ...notificationIds ? { id: { in: notificationIds } } : {}
        },
        data: { status }
    });
}

export const markAllNotificationsAsReadAction = action(emptyValidator, async () => {
    const { user } = await getServerSession();
    await updateNotificationsStatus({
        userId: user.id,
        status: NotificationStatus.Read
    });

    revalidatePath('/notifications');
});
