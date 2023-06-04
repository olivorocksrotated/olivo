import { NotificationType } from '@prisma/client';
import { z } from 'zod';

import { createNotification } from '@/lib/notifications/persistent/create';

import { inngest } from './client';

const signupWelcomeNotificationPayload = z.object({ userId: z.string() });

export const createSignupWelcomeNotification = inngest.createFunction(
    { name: 'Create signup welcome notification' },
    { event: 'user/created' },
    async ({ event }) => {
        const validatedEventData = signupWelcomeNotificationPayload.parse(event.data);
        createNotification(validatedEventData.userId, {
            title: '🎉 Welcome to Olivo!',
            type: NotificationType.SignupWelcome
        });

        return { result: `Welcome notification created for user ${validatedEventData.userId}` };
    }
);
