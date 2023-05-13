'use client';

import { Commitment as CommitmentModel, CommitmentStatus } from '@prisma/client';

// import DeleteButton from './delete-btn';
import StatusButton from './status-btn';

type Commitment = Pick<CommitmentModel, 'status'>;
interface Props {
    commitment: Commitment;
    onStatusChanged: (status: CommitmentStatus) => void;
    onDelete?: (commitment: Commitment) => void;
}

export default function Actions({
    commitment,
    onDelete = () => undefined,
    onStatusChanged
}: Props) {
    const handleOnDelete = () => onDelete(commitment);

    return (
        <div className="flex items-start justify-end gap-3">
            {/* <DeleteButton onDelete={handleOnDelete} /> */}
            <button type="button" onClick={handleOnDelete}>Delete</button>
            <div className="flex w-32 justify-end">
                <StatusButton onStatusChanged={onStatusChanged} status={commitment.status} />
            </div>
        </div>
    );
}
