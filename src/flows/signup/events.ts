import { NotificationType } from '@prisma/client';

import { EventName, inngest } from '@/lib/inngest/client';
import { createNotification } from '@/lib/notifications/persistent/create';

export const createSignupWelcomeNotification = inngest.createFunction(
    { id: 'welcome-notification' },
    { event: EventName.UserCreated },
    async ({ event }) => {
        await createNotification(event.data.userId, {
            title: '🎉 Welcome to Olivo!',
            type: NotificationType.SignupWelcome
        });

        return { result: `Welcome notification created for user ${event.data.userId}` };
    }
);
