import { NotificationType } from '@prisma/client';

import { createNotification } from '@/lib/notifications/persistent/create';

import { inngest } from './client';
import { userCreatedEvent } from './events';

export const createSignupWelcomeNotification = inngest.createFunction(
    { name: 'Create signup welcome notification' },
    { event: userCreatedEvent.name },
    async ({ event }) => {
        const validatedEventData = userCreatedEvent.validation.parse(event.data);
        createNotification(validatedEventData.userId, {
            title: '🎉 Welcome to Olivo!',
            type: NotificationType.SignupWelcome
        });

        return { result: `Welcome notification created for user ${validatedEventData.userId}` };
    }
);
