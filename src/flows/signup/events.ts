import { NotificationType } from '@prisma/client';
import { z } from 'zod';

import { inngest } from '@/lib/inngest/client';
import { InngestEvent } from '@/lib/inngest/types';
import { createNotification } from '@/lib/notifications/persistent/create';

export const userCreatedEvent: InngestEvent = {
    name: 'user/created',
    validation: z.object({ userId: z.string() })
};

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
