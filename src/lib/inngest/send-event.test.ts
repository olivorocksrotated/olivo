import { describe, expect, it, Mock } from 'vitest';

import { inngest } from '@/lib/inngest/client';

import { consoleErrorMock } from '../__mocks__/console';
import { sendEvent } from './send-event';

describe('lib inngest', () => {
    describe('sendEvent', () => {
        const event = { name: 'event', data: {} };

        it('should send an event', async () => {
            await sendEvent(event);

            expect(inngest.send).toBeCalledWith(event);
        });

        it('should not throw an error if sending the event fails', async () => {
            const error = new Error('This should not be thrown');
            (inngest.send as Mock).mockRejectedValueOnce(error);

            await sendEvent(event);
            expect(consoleErrorMock).toBeCalledWith('Failed to send event', { ...event, error });
        });
    });
});
