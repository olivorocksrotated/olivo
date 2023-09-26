import { Mood } from '@prisma/client';

export type BaseMood = Pick<Mood, 'id' | 'comment' | 'status' | 'createdAt'>;
