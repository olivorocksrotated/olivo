import { Commitment, CommitmentStatus } from '@prisma/client';
import { isBefore } from 'date-fns';

export function isNotDone(commitment: Pick<Commitment, 'status'>) {
    return commitment.status !== CommitmentStatus.Done && commitment.status !== CommitmentStatus.Abandoned;
}

export function isPast(referenceDate: Date) {
    return (commitment: Pick<Commitment, 'doneBy'>) => isBefore(commitment.doneBy, referenceDate);
}
