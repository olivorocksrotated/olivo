import { describe, expect, it, Mock } from 'vitest';

import { EventName, inngest } from '@/lib/inngest/client';

import { consoleErrorMock } from '../__mocks__/console';
import { safeSendEvent, sendEvent } from './send-event';

describe('lib inngest', () => {
    const event = { name: EventName.UserCreated, data: { userId: '123' } };

    describe('sendEvent', () => {
        it('should send an event', async () => {
            await sendEvent(event);

            expect(inngest.send).toBeCalledWith(event);
        });

        it('should throw an error if sending the event fails', async () => {
            const error = new Error('This should not be thrown');
            (inngest.send as Mock).mockRejectedValueOnce(error);

            await expect(sendEvent(event)).rejects.toThrowError(error);
        });
    });

    describe('safeSendEvent', () => {
        it('should send an event', async () => {
            await safeSendEvent(event);

            expect(inngest.send).toBeCalledWith(event);
        });

        it('should not throw an error if the event data is not valid', async () => {
            const error = new Error('The event data is not valid');

            const brokenEvent = { ...event, data: 'invalid' };
            await safeSendEvent(brokenEvent);
            expect(consoleErrorMock).toBeCalledWith('Failed to safely send event', { ...brokenEvent, error });
        });

        it('should not throw an error if sending the event fails', async () => {
            const error = new Error('This should not be thrown');
            (inngest.send as Mock).mockRejectedValueOnce(error);

            await safeSendEvent(event);
            expect(consoleErrorMock).toBeCalledWith('Failed to safely send event', { ...event, error });
        });
    });
});
