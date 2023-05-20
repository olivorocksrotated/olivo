'use client';

import { useAutoAnimate } from '@formkit/auto-animate/react';
import { Commitment } from '@prisma/client';
import { useEffect, useState } from 'react';

import { isNotDone, isPast } from '@/lib/commitments/filter';
import { todayAtZeroHourUTC } from '@/lib/date/days';

import CommitmentCard from '../card/commitment-card';
import { Filters } from '../types';

type ListCommitment = Pick<Commitment, 'id' | 'title' | 'status' | 'doneBy'>;

interface Props {
    commitments: ListCommitment[];
    filters: Filters
}

export default function CommitmentsList({ commitments, filters }: Props) {
    const [parent] = useAutoAnimate();
    const [filteredCommitments, setFilteredCommitments] = useState([] as ListCommitment[]);

    useEffect(() => {
        const emptyFilter = () => true;
        const filtersToApply = [
            filters.past ? isPast(todayAtZeroHourUTC()) : emptyFilter,
            filters.notDone ? isNotDone : emptyFilter
        ];
        const isShown = (commitment: ListCommitment) => filtersToApply
            .map((filterFunction) => filterFunction(commitment))
            .every((filterResult) => filterResult === true);

        const filtered = commitments.reduce((acc, commitment) => [
            ...acc,
            ...isShown(commitment) ? [commitment] : []
        ], [] as ListCommitment[]);

        setFilteredCommitments(filtered);
    }, [commitments, filters]);

    return (
        <ul ref={parent} role="list" className="divide-y divide-gray-700">
            {filteredCommitments.map((commitment) => <CommitmentCard key={commitment.id}
                commitment={{ ...commitment, doneBy: commitment.doneBy.toString() }}
            />)}
        </ul>
    );
}
