import { NotificationType } from '@prisma/client';
import { describe, expect, it, vi } from 'vitest';

import prisma from '@/lib/prisma/client';

import { createNotification } from './create';
import { getNotifications } from './get';

describe('lib notifications', () => {
    describe('persistent get', () => {
        describe('getNotifications', () => {
            const userId = 'userId';
            const notification = {
                title: 'title',
                type: NotificationType.SignupWelcome,
                payload: {}
            };

            it('should return notifications', async () => {
                const timer = vi.useFakeTimers();
                const anotherNotification = { ...notification, type: NotificationType.UnfinishedCommitments };

                await createNotification(userId, notification);
                await timer.advanceTimersByTimeAsync(10000);
                await createNotification(userId, anotherNotification);

                const retrievedNotifications = await getNotifications({ userId });

                expect(retrievedNotifications.length).toBe(2);
                expect(retrievedNotifications).toContainObject(notification);
                expect(retrievedNotifications).toContainObject(anotherNotification);
            });

            it('should return notifications filtered by status', async () => {
                // TODO Add a way to update a notification status without actions
            });

            it('should return notifications ordered by ascending created date', async () => {
                const findManySpy = vi.spyOn(prisma.notification, 'findMany');
                await getNotifications({ userId, order: 'asc' });

                expect(findManySpy).toHaveBeenCalledWith(expect.objectContaining({
                    orderBy: { createdAt: 'asc' }
                }));
            });

            it('should return notifications limited by the take limit', async () => {
                const anotherNotification = { ...notification, type: NotificationType.UnfinishedCommitments };

                await createNotification(userId, notification);
                await createNotification(userId, anotherNotification);

                const retrievedNotifications = await getNotifications({ userId, take: 1 });

                expect(retrievedNotifications.length).toBe(1);
                expect(retrievedNotifications).toContainObject(notification);
            });

            it('should return an error if getting notifications fails', async () => {
                const expectedError = new Error('Ups');
                vi.spyOn(prisma.notification, 'findMany').mockRejectedValueOnce(expectedError);

                await expect(getNotifications({ userId })).rejects.toThrowError(expectedError);
            });
        });
    });
});
