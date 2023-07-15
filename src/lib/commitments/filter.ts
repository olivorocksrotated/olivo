import { Commitment } from '@prisma/client';
import { isBefore } from 'date-fns';

export function isOverdue(referenceDate: Date) {
    return (commitment: Pick<Commitment, 'doneBy'>) => isBefore(commitment.doneBy, referenceDate);
}
