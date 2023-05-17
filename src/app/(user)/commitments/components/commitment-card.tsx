'use client';

import { Commitment as CommitmentModel, CommitmentStatus } from '@prisma/client';
import { KeyboardEvent, useState } from 'react';
import { useZact } from 'zact/client';

import { updateCommitmentAction } from '@/lib/commitments/update';
import { formatDate, formatRelativeDate } from '@/lib/date/format';

import DeleteButton from './actions/delete-btn';
import StatusPopover from './actions/status-popover';

type Commitment = Pick<CommitmentModel, 'id' | 'status' | 'title'> & { doneBy: string };
interface Props {
    commitment: Commitment;
}

export default function CommitmentCard({ commitment: originalCommitment }: Props) {
    const [commitment, setCommitment] = useState(originalCommitment);
    const [editTitle, setEditTitle] = useState({ value: commitment.title, isEditing: false });
    const [editDoneBy, setEditDoneBy] = useState({ value: formatDate(commitment.doneBy), isEditing: false });
    const now = new Date();

    const editStyle = 'hover:cursor-pointer hover:underline hover:decoration-dotted';

    const { mutate: update } = useZact(updateCommitmentAction);

    const updateCommitment = async ({ status, title, doneBy }: {
        status?: CommitmentStatus;
        title?: string;
        doneBy?: string;
    }) => {
        setCommitment((previous) => ({
            ...previous,
            title: title ?? previous.title,
            status: status ?? previous.status,
            doneBy: doneBy ?? previous.doneBy
        }));

        await update({ id: commitment.id, status, title, doneBy });
    };

    const handleStatusChange = async (status: CommitmentStatus) => {
        await updateCommitment({ status });
    };

    const handleTitleKeyDown = async (event: KeyboardEvent<HTMLInputElement>) => {
        if (event.key !== 'Enter') {
            return;
        }

        if (commitment.title === editTitle.value) {
            return setEditTitle((previous) => ({ ...previous, isEditing: false }));
        }

        const title = editTitle.value;
        setEditTitle(() => ({ value: title, isEditing: false }));
        await updateCommitment({ title });
    };

    const handleDoneByKeyDown = async (event: KeyboardEvent<HTMLInputElement>) => {
        if (event.key !== 'Enter') {
            return;
        }

        const doneBy = editDoneBy.value;
        setEditDoneBy(() => ({ value: doneBy, isEditing: false }));
        await updateCommitment({ doneBy });
    };

    return (
        <li className="py-3 sm:py-4">
            <div className="flex items-center gap-x-4">
                <div>
                    <StatusPopover commitment={commitment} onStatusChange={handleStatusChange} />
                </div>
                <div className="min-w-0 flex-1">
                    <div className="flex gap-1 font-medium text-white">
                        <div className="min-w-fit text-gray-400">I will{' '}</div>
                        <div className="grow truncate">
                            {!editTitle.isEditing ?
                                <span className={editStyle} onClick={() => setEditTitle((previous) => ({ ...previous, isEditing: true }))}>
                                    {commitment.title}
                                </span> :
                                <input type="text"
                                    autoFocus
                                    className="w-full bg-slate-700"
                                    onKeyDown={handleTitleKeyDown}
                                    value={editTitle.value}
                                    onChange={(event) => setEditTitle((previous) => ({ ...previous, value: event.target.value }))}
                                />}
                        </div>
                    </div>
                    <div className="flex gap-1 text-sm text-gray-400">
                        <div>By{' '}</div>
                        <div>
                            {!editDoneBy.isEditing ?
                                <span className={editStyle} onClick={() => setEditDoneBy((previous) => ({ ...previous, isEditing: true }))}>
                                    {formatRelativeDate(new Date(commitment.doneBy), now)}
                                </span> :
                                <input type="date"
                                    autoFocus
                                    className="bg-slate-700"
                                    onKeyDown={handleDoneByKeyDown}
                                    value={editDoneBy.value}
                                    onChange={(event) => setEditDoneBy((previous) => ({ ...previous, value: event.target.value }))}
                                />}
                        </div>
                    </div>
                </div>
                <div>
                    <DeleteButton onDelete={() => handleStatusChange(CommitmentStatus.Abandoned)} />
                </div>
            </div>
        </li>
    );
}
