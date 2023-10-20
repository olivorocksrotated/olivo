import { serve } from 'inngest/next';

import { createSignupWelcomeNotification } from '@/flows/signup/events';

import { inngest } from '../../../lib/inngest/client';

export const { GET, POST, PUT } = serve({
    client: inngest,
    functions: [
        createSignupWelcomeNotification
    ]
});
