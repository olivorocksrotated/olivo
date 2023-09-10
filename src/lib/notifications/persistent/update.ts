'use server';

import { NotificationStatus } from '@prisma/client';
import { revalidatePath } from 'next/cache';
import { zact } from 'zact/server';

import { getServerSession } from '../../auth/session';
import prisma from '../../prisma/client';

export const markAllNotificationsAsReadAction = zact()(
    async () => {
        const { user } = await getServerSession();
        await prisma.notification.updateMany({
            where: {
                ownerId: user.id
            },
            data: {
                status: NotificationStatus.Read
            }
        });

        revalidatePath('/notifications');
    }
);
