'use client';

import { CommitmentStatus } from '@prisma/client';
import { useAction } from 'next-safe-action/hooks';
import { useEffect, useState } from 'react';

import { isOverdue } from '@/lib/commitments/filter';
import type { updateCommitmentAction } from '@/lib/commitments/update';
import { todayAtZeroHourUTC } from '@/lib/date/days';
import { getRelativeDateWithoutTime } from '@/lib/date/format';

import { ServerCommitment } from '../../types';
import StatusPopover from '../actions/status-popover';
import OverdueStatusMarker from '../status-marker/overdue';

interface Props {
    commitment: ServerCommitment;
    updateCommitmentAction: typeof updateCommitmentAction
}

export default function CommitmentEntry({
    commitment: originalCommitment,
    updateCommitmentAction
}: Props) {
    const [commitment, setCommitment] = useState(originalCommitment);

    useEffect(() => {
        setCommitment(originalCommitment);
    }, [originalCommitment]);

    const now = todayAtZeroHourUTC();
    const isPastCommitment = isOverdue(now)(commitment);

    const { execute: update } = useAction(updateCommitmentAction);

    const handleStatusChange = async (status: CommitmentStatus) => {
        setCommitment((previous) => ({ ...previous, status }));

        const doneAt = status === CommitmentStatus.Done ? new Date().toISOString() : null;
        await update({ id: commitment.id, status, doneAt });
    };

    return (
        <li key={commitment.id} className="cursor-pointer rounded-lg bg-neutral-950 p-3 hover:bg-neutral-900">
            <div className="flex items-start gap-x-4">
                <div onClick={(event) => event.stopPropagation()}>
                    <StatusPopover commitment={commitment} onStatusChange={handleStatusChange} />
                </div>
                <div className="min-w-0 flex-1 space-y-1">
                    <div className="flex gap-1 font-medium leading-tight text-white">
                        <div className="min-w-fit text-gray-400">I will{' '}</div>
                        <div className="grow truncate">{commitment.title}</div>
                    </div>
                    <div className="flex items-center justify-between">
                        <div className="text-sm text-gray-400">
                            By {getRelativeDateWithoutTime(commitment.doneBy, now)}
                        </div>
                        {isPastCommitment ? <div className="flex items-center gap-3"><OverdueStatusMarker /></div> : null}
                    </div>
                </div>
            </div>
        </li>
    );
}
