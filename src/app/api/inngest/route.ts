import { serve } from 'inngest/next';

import { createSignupWelcomeNotification } from '@/inngest/functions';

import { inngest } from '../../../inngest/client';

export const { GET, POST, PUT } = serve(inngest, [
    createSignupWelcomeNotification
]);
