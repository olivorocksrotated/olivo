'use server';

import { NotificationStatus } from '@prisma/client';
import { revalidatePath } from 'next/cache';
import { zact } from 'zact/server';
import { z } from 'zod';

import { getServerSession } from '../../auth/session';
import prisma from '../../prisma';

export const markNotificationAsReadAction = zact(z.object({
    id: z.string()
}))(
    async ({ id }) => {
        const { user } = await getServerSession();
        const updatedNotification = await prisma.notification.update({
            where: {
                id,
                ownerId: user.id
            },
            data: {
                status: NotificationStatus.Read
            }
        });

        revalidatePath('/notifications');

        return updatedNotification.id;
    }
);
