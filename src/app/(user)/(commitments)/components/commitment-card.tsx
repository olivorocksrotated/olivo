'use client';

import { Commitment as CommitmentModel, CommitmentStatus } from '@prisma/client';
import clsx from 'clsx';
import { KeyboardEvent, useState } from 'react';

import { formatRelativeDate, formatStringDate } from '@/lib/date/format';
import { fetchFromApi, ResourcePath } from '@/lib/http/fetch';
import { HttpMethod } from '@/lib/http/route';

import Actions from './actions/actions';

type Commitment = Pick<CommitmentModel, 'id' | 'status' | 'title'> & { doneBy: string };
interface Props {
    commitment: Commitment;
}

export default function CommitmentCard({ commitment: originalCommitment }: Props) {
    const [commitment, setCommitment] = useState(originalCommitment);
    const [editTitle, setEditTitle] = useState({ value: commitment.title, isEditing: false });
    const [editDoneBy, setEditDoneBy] = useState({ value: formatStringDate(commitment.doneBy), isEditing: false });
    const now = new Date();

    const titleStyle = clsx(
        'truncate',
        'hover:cursor-pointer hover:underline hover:decoration-dotted'
    );

    const updateCommitment = ({ status, title, doneBy }: {
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

        return fetchFromApi({
            method: HttpMethod.PUT,
            path: ResourcePath.Commitments,
            attachToPath: `/${commitment.id}`,
            body: {
                ...status ? { status } : {},
                ...title ? { title } : {},
                ...doneBy ? { doneBy } : {}
            }
        });
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
            <div className="flex items-center space-x-4">
                <div className="min-w-0 flex-1">
                    <div className="flex gap-1 font-medium text-white">
                        <div className="text-gray-400">I will{' '}</div>
                        <div className="grow">
                            {!editTitle.isEditing ?
                                <span className={titleStyle} onClick={() => setEditTitle((previous) => ({ ...previous, isEditing: true }))}>
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
                                <span className={titleStyle} onClick={() => setEditDoneBy((previous) => ({ ...previous, isEditing: true }))}>
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
                <div className="inline-flex items-center text-base font-semibold text-white">
                    <Actions commitment={commitment}
                        onStatusChanged={handleStatusChange}
                        onDelete={() => handleStatusChange(CommitmentStatus.Abandoned)}
                    />
                </div>
            </div>
        </li>
    );
}
