import { Commitment } from '@prisma/client';

export type ClientCommitment = Pick<Commitment, 'id' | 'status' | 'title'> & { doneBy: string };
export type ServerCommitment = Pick<Commitment, 'id' | 'status' | 'doneBy' | 'title'>;
