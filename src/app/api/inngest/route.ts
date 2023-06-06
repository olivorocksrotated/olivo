import { serve } from 'inngest/next';

import { createSignupWelcomeNotification } from '@/lib/inngest/functions';

import { inngest } from '../../../lib/inngest/client';

export const { GET, POST, PUT } = serve(inngest, [
    createSignupWelcomeNotification
]);
