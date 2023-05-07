'use client';

import { Commitment as CommitmentModel } from '@prisma/client';

import DeleteButton from './delete-btn';
import StatusButton from './status-btn';

type Commitment = Pick<CommitmentModel, 'status'>
interface Props {
    commitment: Commitment,
    onStart?: (commitment: Commitment) => void
    onDone?: (commitment: Commitment) => void
    onDelete?: (commitment: Commitment) => void
}

export default function Actions({
    commitment,
    onStart = () => undefined,
    onDone = () => undefined,
    onDelete = () => undefined
}: Props) {
    const handleOnStart = () => onStart(commitment);
    const handleOnDone = () => onDone(commitment);
    const handleOnDelete = () => onDelete(commitment);

    return (
        <div className="flex items-center justify-end gap-3">
            <DeleteButton onDelete={handleOnDelete} />
            <StatusButton commitment={commitment} onDone={handleOnDone} onStart={handleOnStart} />
        </div>
    );
}
