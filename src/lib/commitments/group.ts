import { Commitment } from '@prisma/client';

import { isOverdue } from './filter';

export type TimedCommitment = Pick<Commitment, 'doneBy' | 'doneAt'>;

export function groupCommitmentsByOverdue<T extends TimedCommitment>({
    commitments,
    referenceDate
}: {
    commitments: T[],
    referenceDate: Date
}): {
    overdue: T[],
    onTime: T[]
} {
    const isOverdueComparedToReferenceDate = isOverdue(referenceDate);

    return commitments.reduce((acc, currentCommitment) => {
        const shouldBeDone = isOverdueComparedToReferenceDate(currentCommitment);

        return {
            ...acc,
            overdue: shouldBeDone ? [...acc.overdue, currentCommitment] : acc.overdue,
            onTime: !shouldBeDone ? [...acc.onTime, currentCommitment] : acc.onTime
        };
    }, {
        overdue: [] as T[],
        onTime: [] as T[]
    });
}
