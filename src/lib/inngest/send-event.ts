import { EventName, inngest } from './client';
import { validateEventData } from './validate-event-data';

export async function sendEvent({ name, data }: {
    name: EventName,
    data: any
}) {
    return inngest.send({ name, data });
}

export async function safeSendEvent({ name, data }: {
    name: EventName,
    data: any
}) {
    try {
        const result = validateEventData(name, data);
        if (!result.success) {
            throw new Error('The event data is not valid');
        }

        await inngest.send({ name, data });
    } catch (error) {
        console.error('Failed to safely send event', { name, data, error });
    }
}
