import { EventSchemas, Inngest } from 'inngest';
import { z } from 'zod';

export enum EventName {
    UserCreated = 'user/created'
}

export const events = {
    [EventName.UserCreated]: {
        data: z.object({ userId: z.string() })
    }
};

// Create a client to send and receive events
export const inngest = new Inngest({
    id: 'Olivo',
    schemas: new EventSchemas().fromZod(events)
});
