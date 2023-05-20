'use client';

import { useAutoAnimate } from '@formkit/auto-animate/react';
import { Commitment } from '@prisma/client';

import CommitmentCard from '../card/commitment-card';
import { Filters } from '../types';

interface Props {
    commitments: Pick<Commitment, 'id' | 'title' | 'status' | 'doneBy'>[];
    filters: Filters
}

export default function CommitmentsList({ commitments }: Props) {
    const [parent] = useAutoAnimate();

    return (
        <ul ref={parent} role="list" className="divide-y divide-gray-700">
            {commitments.map((commitment) => <CommitmentCard key={commitment.id}
                commitment={{ ...commitment, doneBy: commitment.doneBy.toString() }}
            />)}
        </ul>
    );
}
