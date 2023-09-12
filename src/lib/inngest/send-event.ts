import { inngest } from './client';

export async function sendEvent({ name, data }: {
    name: string,
    data: any
}) {
    try {
        await inngest.send({ name, data });
    } catch (error) {
        console.error('Failed to send event', { name, data, error });
    }
}
