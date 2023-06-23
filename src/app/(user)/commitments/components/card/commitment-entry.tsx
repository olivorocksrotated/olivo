'use client';

import { CommitmentStatus } from '@prisma/client';
import { useEffect, useState } from 'react';
import { useZact } from 'zact/client';

import { isPast } from '@/lib/commitments/filter';
import { updateCommitmentAction } from '@/lib/commitments/update';
import { todayAtZeroHourUTC } from '@/lib/date/days';
import { getRelativeDateWithoutTime } from '@/lib/date/format';

import { ClientCommitment } from '../../types';
import PastStatusMarker from '../status-marker/past';
import StatusPopover from './actions/status-popover';

interface Props {
    commitment: ClientCommitment;
}

export default function CommitmentEntry({ commitment: originalCommitment }: Props) {
    const [commitment, setCommitment] = useState(originalCommitment);

    useEffect(() => {
        setCommitment(originalCommitment);
    }, [originalCommitment]);

    const now = todayAtZeroHourUTC();
    const isPastCommitment = isPast(now)({ doneBy: new Date(commitment.doneBy) });

    const { mutate: update } = useZact(updateCommitmentAction);

    const handleStatusChange = async (status: CommitmentStatus) => {
        setCommitment((previous) => ({ ...previous, status }));

        await update({ id: commitment.id, status });
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
                            By {getRelativeDateWithoutTime(new Date(commitment.doneBy), now)}
                        </div>
                        {isPastCommitment ? <div className="flex items-center gap-3"><PastStatusMarker /></div> : null}
                    </div>
                </div>
            </div>
        </li>
    );
}
