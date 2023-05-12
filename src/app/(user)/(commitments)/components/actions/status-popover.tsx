'use client';

import { Commitment, CommitmentStatus } from '@prisma/client';
import * as Popover from '@radix-ui/react-popover';
import { useState } from 'react';

import AbandonedStatusMarker from '../status-marker/abandoned';
import DoneStatusMarker from '../status-marker/done';
import InProgressStatusMarker from '../status-marker/in-progress';
import NotStartedStatusMarker from '../status-marker/not-started';

interface Props {
    commitment: Pick<Commitment, 'status'>;
    onStatusChange: (status: CommitmentStatus) => void
}

export default function StatusPopover({ commitment, onStatusChange }: Props) {
    const [isOpen, setIsOpen] = useState(false);

    const handleStatusChange = (status: CommitmentStatus) => {
        onStatusChange(status);
        setIsOpen(false);
    };

    return (
        <Popover.Root onOpenChange={setIsOpen} open={isOpen}>
            <Popover.Trigger asChild>
                <button type="button" aria-label="Change status">
                    <div>
                        {
                            commitment.status === CommitmentStatus.NotStartedYet ? <NotStartedStatusMarker /> :
                            commitment.status === CommitmentStatus.InProgress ? <InProgressStatusMarker /> :
                            commitment.status === CommitmentStatus.Done ? <DoneStatusMarker /> :
                            commitment.status === CommitmentStatus.Abandoned ? <AbandonedStatusMarker /> : null
                        }
                    </div>
                </button>
            </Popover.Trigger>
            <Popover.Portal>
                <Popover.Content align="start">
                    <div className="w-52 rounded bg-gray-700 p-2 text-sm shadow-sm will-change-transform">
                        <div onClick={() => handleStatusChange(CommitmentStatus.NotStartedYet)}
                            className="mb-2 flex cursor-pointer items-center gap-x-2 rounded px-2 py-1 hover:bg-gray-600"
                        >
                            <NotStartedStatusMarker />
                            <span>Not started</span>
                        </div>
                        <div onClick={() => handleStatusChange(CommitmentStatus.InProgress)}
                            className="mb-2 flex cursor-pointer items-center gap-x-2 rounded px-2 py-1 hover:bg-gray-600"
                        >
                            <InProgressStatusMarker /><span>In progress</span>
                        </div>
                        <div onClick={() => handleStatusChange(CommitmentStatus.Done)}
                            className="flex cursor-pointer items-center gap-x-2 rounded px-2 py-1 hover:bg-gray-600"
                        >
                            <DoneStatusMarker /><span>Done</span>
                        </div>
                    </div>
                    <Popover.Arrow className="fill-gray-700" />
                </Popover.Content>
            </Popover.Portal>
        </Popover.Root>
    );
}
