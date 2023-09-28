import { Commitment } from '@prisma/client';

import { isOverdue } from './filter';

export type TimedCommitment = Pick<Commitment, 'doneBy' | 'doneAt'>;

export function groupCommitmentsByOverdue({
    commitments,
    referenceDate
}: {
    commitments: TimedCommitment[],
    referenceDate: Date
}): {
    overdue: TimedCommitment[],
    onTime: TimedCommitment[]
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
        overdue: [] as TimedCommitment[],
        onTime: [] as TimedCommitment[]
    });
}
