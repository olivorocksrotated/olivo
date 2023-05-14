'use client';

import { useAutoAnimate } from '@formkit/auto-animate/react';
import { Commitment } from '@prisma/client';

import CommitmentCard from './commitment-card';

interface Props {
    commitments: Pick<Commitment, 'id' | 'title' | 'status' | 'doneBy'>[];
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
