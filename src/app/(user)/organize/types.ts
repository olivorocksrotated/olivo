import { Commitment } from '@prisma/client';

export type ServerCommitment = Pick<Commitment, 'id' | 'status' | 'title' | 'doneBy' | 'doneAt' | 'description'>;
export type ClientCommitment = Pick<Commitment, 'id' | 'status' | 'title' | 'doneBy' | 'doneAt' | 'description'> & { description: string | null };
