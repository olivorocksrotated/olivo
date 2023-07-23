import { Commitment } from '@prisma/client';
import { isAfter, isBefore, isSameDay } from 'date-fns';

export function isOverdue(referenceDate: Date) {
    return (commitment: Pick<Commitment, 'doneBy' | 'doneAt'>) => {
        const hasTimeLeft = isBefore(referenceDate, commitment.doneBy) || isSameDay(referenceDate, commitment.doneBy);
        if (hasTimeLeft) {
            return false;
        }

        if (!commitment.doneAt) {
            return true;
        }

        if (isSameDay(commitment.doneAt, commitment.doneBy)) {
            return false;
        }

        return isAfter(commitment.doneAt, commitment.doneBy);
    };
}
