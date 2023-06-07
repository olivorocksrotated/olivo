import { z } from 'zod';

export interface InngestEvent {
    name: string;
    validation: z.ZodType;
}
