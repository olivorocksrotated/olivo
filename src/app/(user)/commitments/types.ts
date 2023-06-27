import { Commitment } from '@prisma/client';

export type ServerCommitment = Pick<Commitment, 'id' | 'status' | 'doneBy' | 'title' | 'description'>;
export type ClientCommitment = Pick<Commitment, 'id' | 'status' | 'title' | 'doneBy'> & { description: string | null };
