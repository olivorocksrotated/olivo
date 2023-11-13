'use client';

import { useAutoAnimate } from '@formkit/auto-animate/react';

import type { createCommitmentAction } from '@/lib/commitments/create';
import type { updateCommitmentAction } from '@/lib/commitments/update';

import { ClientCommitment } from '../../types';
import AddButton from '../actions/add-btn';
import CommitmentCard from '../card/commitment-card';

interface Props {
    commitments: ClientCommitment[];
    createCommitmentAction: typeof createCommitmentAction,
    updateCommitmentAction: typeof updateCommitmentAction
}

export default function CommitmentsList({
    commitments,
    createCommitmentAction,
    updateCommitmentAction
}: Props) {
    const [parent] = useAutoAnimate();

    return (
        <ul ref={parent} role="list" className="grow space-y-2">
            <AddButton createCommitmentAction={createCommitmentAction} />
            {commitments.map((commitment) => <CommitmentCard
                key={commitment.id}
                commitment={commitment}
                updateCommitmentAction={updateCommitmentAction}
            />)}
        </ul>
    );
}
