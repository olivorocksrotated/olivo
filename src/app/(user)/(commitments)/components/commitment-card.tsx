'use client';

import { Commitment as CommitmentModel, CommitmentStatus } from '@prisma/client';
import clsx from 'clsx';
import { KeyboardEvent, useState } from 'react';

import { formatRelativeDate } from '@/lib/date/format';
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
    const now = new Date();

    const titleStyle = clsx(
        'truncate',
        'hover:cursor-pointer hover:underline hover:decoration-dotted'
    );

    const updateCommitment = ({ status, title }: {
        status?: CommitmentStatus;
        title?: string;
    }) => {
        setCommitment((previous) => ({
            ...previous,
            title: title ?? previous.title,
            status: status ?? previous.status
        }));

        return fetchFromApi({
            method: HttpMethod.PUT,
            path: ResourcePath.Commitments,
            attachToPath: `/${commitment.id}`,
            body: {
                ...status ? { status } : {},
                ...title ? { title } : {}
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

    return (
        <li className="py-3 sm:py-4">
            <div className="flex items-center space-x-4">
                <div className="min-w-0 flex-1">
                    <div className="flex gap-1 font-medium text-white">
                        <div>
                            <span className="text-gray-400">I will</span>{' '}
                        </div>
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
                    <p className="truncate text-sm text-gray-400">
                        By {formatRelativeDate(new Date(commitment.doneBy), now)}
                    </p>
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
