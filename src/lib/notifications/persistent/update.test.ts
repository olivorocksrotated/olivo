import { NotificationStatus, NotificationType } from '@prisma/client';
import { revalidatePath } from 'next/cache';
import { beforeEach, describe, expect, it, vi } from 'vitest';

import prisma from '@/lib/prisma/client';
import { defaultServerError } from '@/lib/server-actions/errors';

import { createNotification } from './create';
import { getNotifications } from './get';
import { markAllNotificationsAsReadAction, updateNotificationsStatus } from './update';

vi.mock('../../auth/session', async () => ({
    getServerSession: vi.fn().mockResolvedValue({ user: { id: 'userId' } })
}));

vi.mock('next/cache', () => ({
    revalidatePath: vi.fn()
}));

describe('lib notifications', () => {
    describe('persistent update', () => {
        describe('updateNotificationsStatus', () => {
            const userId = 'userId';
            const readStatus = NotificationStatus.Read;

            const notification = {
                title: 'title',
                type: NotificationType.SignupWelcome,
                payload: {}
            };
            const anotherNotification = {
                ...notification,
                type: NotificationType.UnfinishedCommitments
            };

            beforeEach(() => {
                prisma.notification.deleteMany({});
            });

            it('should update the status of all the notifications of a user', async () => {
                await createNotification(userId, notification);
                await createNotification(userId, anotherNotification);

                const anotherUserId = 'anotherUserId';
                await createNotification(anotherUserId, notification);
                await createNotification(anotherUserId, anotherNotification);
                await updateNotificationsStatus({ userId, status: readStatus });
                const updatedRetrievedNotifications = await getNotifications({ userId });

                expect(updatedRetrievedNotifications.length).toBe(2);
                expect(updatedRetrievedNotifications[0].status).toBe(readStatus);
                expect(updatedRetrievedNotifications[1].status).toBe(readStatus);
            });

            it('should not update the status of notifications that do not belong to the user', async () => {
                await createNotification(userId, notification);
                await createNotification(userId, anotherNotification);

                const anotherUserId = 'anotherUserId';
                await createNotification(anotherUserId, notification);
                await createNotification(anotherUserId, anotherNotification);

                await updateNotificationsStatus({ userId, status: readStatus });

                const retrievedNotifications = await getNotifications({ userId: anotherUserId });
                expect(retrievedNotifications.length).toBe(2);
                expect(retrievedNotifications[0].status).toBe(NotificationStatus.Open);
                expect(retrievedNotifications[1].status).toBe(NotificationStatus.Open);
            });

            it('should only update the status of the given notifications', async () => {
                const createdNotification = await createNotification(userId, notification);
                await createNotification(userId, anotherNotification);

                await updateNotificationsStatus({
                    userId,
                    status: readStatus,
                    notificationIds: [createdNotification.id]
                });

                const retrievedNotifications = await getNotifications({ userId });
                expect(retrievedNotifications[0].status).toBe(readStatus);
                expect(retrievedNotifications[1].status).toBe(NotificationStatus.Open);
            });

            it('should return an error if updating notifications fails', async () => {
                const expectedError = new Error('Ups');
                vi.spyOn(prisma.notification, 'updateMany').mockRejectedValueOnce(expectedError);

                await expect(updateNotificationsStatus({ userId, status: readStatus })).rejects.toThrowError(expectedError);
            });
        });

        describe('markAllNotificationsAsReadAction', () => {
            const userId = 'userId';
            const notification = {
                title: 'title',
                type: NotificationType.SignupWelcome,
                payload: {}
            };
            const anotherNotification = {
                ...notification,
                type: NotificationType.UnfinishedCommitments
            };

            it('should update the status of all the notifications of a user', async () => {
                await createNotification(userId, notification);
                await createNotification(userId, anotherNotification);
                await markAllNotificationsAsReadAction(undefined);
                const updatedRetrievedNotifications = await getNotifications({ userId });

                expect(updatedRetrievedNotifications.length).toBe(2);
                expect(updatedRetrievedNotifications[0].status).toBe(NotificationStatus.Read);
                expect(updatedRetrievedNotifications[1].status).toBe(NotificationStatus.Read);
            });

            it('should revalidate the notifications path after updating notification', async () => {
                await markAllNotificationsAsReadAction(undefined);
                expect(revalidatePath).toHaveBeenCalledWith('/notifications');
            });

            it('should return an error if updating notification fails', async () => {
                const expectedError = new Error('Ups');
                vi.spyOn(prisma.notification, 'updateMany').mockRejectedValueOnce(expectedError);

                const { serverError } = await markAllNotificationsAsReadAction(undefined);
                expect(serverError).toBe(defaultServerError.message);
            });
        });
    });
});
