import { NotificationStatus, NotificationType } from '@prisma/client';
import { beforeEach, describe, expect, it, vi } from 'vitest';

import prisma from '@/lib/prisma/client';

import { createNotification } from './create';
import { getNotifications } from './get';
import { updateNotificationsStatus } from './update';

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

                const retrievedNotifications = await getNotifications({ userId });
                expect(retrievedNotifications.length).toBe(2);
                expect(retrievedNotifications[0].status).toBe(NotificationStatus.Open);
                expect(retrievedNotifications[1].status).toBe(NotificationStatus.Open);

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
    });
});
