import { z } from 'zod';

interface Event {
    name: string;
    validation: z.ZodType;
}

export const userCreatedEvent: Event = {
    name: 'user/created',
    validation: z.object({ userId: z.string() })
};
