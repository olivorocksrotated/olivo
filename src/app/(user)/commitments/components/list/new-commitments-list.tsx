'use client';

import { useAutoAnimate } from '@formkit/auto-animate/react';
import { Commitment } from '@prisma/client';

import AddButton from '../card/actions/add-btn';
import NewCommitmentCard from '../card/new-commitment-card';

interface Props {
    commitments: Pick<Commitment, 'id' | 'doneBy' | 'status' | 'title'>[];
}

export default function NewCommitmentsList({ commitments }: Props) {
    const [parent] = useAutoAnimate();

    return (
        <ul ref={parent} role="list" className="max-w-2xl grow space-y-2">
            <AddButton />
            {commitments.map((commitment) => <NewCommitmentCard key={commitment.id} commitment={{ ...commitment, doneBy: commitment.doneBy.toString() }} />)}
        </ul>
    );
}
