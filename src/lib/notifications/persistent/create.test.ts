import { NotificationType } from '@prisma/client';
import { revalidatePath } from 'next/cache';
import { beforeEach, describe, expect, it, vi } from 'vitest';

import prisma from '@/lib/prisma/client';

import { createNotification, createNotificationAction } from './create';
import { getNotifications } from './get';

vi.mock('../../auth/session', async () => ({
    getServerSession: vi.fn().mockResolvedValue({ user: { id: 'userId' } })
}));

vi.mock('next/cache', () => ({
    revalidatePath: vi.fn()
}));

describe('lib notifications', () => {
    describe('persistent create', () => {
        const userId = 'userId';
        const notification = {
            title: 'title',
            type: NotificationType.SignupWelcome,
            payload: {}
        };

        beforeEach(() => {
            prisma.notification.deleteMany({});
        });

        describe('createNotification', () => {
            it('should create a notification', async () => {
                // eslint-disable-next-line @typescript-eslint/no-unused-vars
                const { ownerId, ...createdNotification } = await createNotification(userId, notification);
                const retrievedNotification = (await getNotifications({ userId }))[0];

                expect(retrievedNotification).toStrictEqual(createdNotification);
            });

            it('should create a notification with a default payload if none is provided', async () => {
                const createdNotification = await createNotification(userId, { ...notification, payload: undefined });

                expect(createdNotification.payload).toStrictEqual({});
            });

            it('should return an error if creating the notification fails', async () => {
                const expectedError = new Error('Ups');
                vi.spyOn(prisma.notification, 'create').mockRejectedValueOnce(expectedError);

                await expect(createNotification(userId, notification)).rejects.toThrowError(expectedError);
            });
        });

        describe('createNotificationAction', () => {
            it('should create a notification and return its id', async () => {
                const id = await createNotificationAction(notification);
                const retrievedNotification = await getNotifications({ userId });

                expect(retrievedNotification[0].id).toBe(id);
            });

            it('should revalidate the notifications path after creating the notification', async () => {
                await createNotificationAction(notification);
                expect(revalidatePath).toHaveBeenCalledWith('/notifications');
            });

            it('should return an error if creating the notification fails', async () => {
                const expectedError = new Error('Ups');
                vi.spyOn(prisma.notification, 'create').mockRejectedValueOnce(expectedError);

                await expect(createNotificationAction(notification)).rejects.toThrowError(expectedError);
            });

            describe('validations', () => {
                it('should return a validation error if the title is not a string', async () => {
                    const expectedError = new Error('Validation error: Expected string, received number at "title"');
                    await expect(createNotificationAction({ ...notification, title: (1 as any) })).rejects.toThrowError(expectedError);
                });

                it('should return a validation error if the payload is not an object', async () => {
                    const expectedError = new Error('Validation error: Expected object, received string at "payload"');
                    await expect(createNotificationAction({ ...notification, payload: ('nope' as any) })).rejects.toThrowError(expectedError);
                });

                it('should return a validation error if the type is not a NotificationType', async () => {
                    try {
                        await createNotificationAction({ ...notification, type: ('nope' as any) });
                    } catch (error: any) {
                        expect(error.message).toContain('Validation error: Invalid enum value');
                        expect(error.message).toContain('received \'nope\' at "type"');
                    }
                });
            });
        });
    });
});