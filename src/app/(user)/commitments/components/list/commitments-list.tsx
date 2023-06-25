'use client';

import { useAutoAnimate } from '@formkit/auto-animate/react';

import { ServerCommitment } from '../../types';
import AddButton from '../actions/add-btn';
import CommitmentCard from '../card/commitment-card';

interface Props {
    commitments: ServerCommitment[];
}

export default function CommitmentsList({ commitments }: Props) {
    const [parent] = useAutoAnimate();

    return (
        <ul ref={parent} role="list" className="max-w-2xl grow space-y-2">
            <AddButton />
            {commitments.map((commitment) => <CommitmentCard key={commitment.id} commitment={{
                ...commitment,
                doneBy: commitment.doneBy.toString(),
                description: JSON.stringify(commitment.description)
            }}
            />)}
        </ul>
    );
}
