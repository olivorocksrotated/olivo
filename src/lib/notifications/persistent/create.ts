'use server';

import { NotificationType } from '@prisma/client';
import { revalidatePath } from 'next/cache';
import { zact } from 'zact/server';
import { z } from 'zod';

import { getServerSession } from '../../auth/session';
import prisma from '../../prisma';

export async function createNotification(userId: string, notification: {
    title: string,
    type: NotificationType,
    payload?: object
}) {
    return prisma.notification.create({
        data: {
            ownerId: userId,
            ...notification,
            payload: notification.payload ?? {}
        }
    });
}

export const createNotificationAction = zact(z.object({
    title: z.string(),
    payload: z.object({}).passthrough(),
    type: z.nativeEnum(NotificationType)
}))(
    async (notification) => {
        const { user } = await getServerSession();
        const createdNotification = await createNotification(user.id, notification);

        revalidatePath('/notifications');

        return createdNotification.id;
    }
);
