import { z } from 'zod';

export const emptyValidator = z.object({}).nullish();
