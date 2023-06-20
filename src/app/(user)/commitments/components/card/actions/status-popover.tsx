'use client';

import { Commitment, CommitmentStatus } from '@prisma/client';
import clsx from 'clsx';

import { useCloseUiComponent } from '@/app/components/ui/hooks/useCloseUiComponent';
import Popover from '@/app/components/ui/popover/popover';

import AbandonedStatusMarker from '../../status-marker/abandoned';
import DoneStatusMarker from '../../status-marker/done';
import InProgressStatusMarker from '../../status-marker/in-progress';
import NotStartedStatusMarker from '../../status-marker/not-started';

interface Props {
    commitment: Pick<Commitment, 'status'>;
    onStatusChange: (status: CommitmentStatus) => void
}

export default function StatusPopover({ commitment, onStatusChange }: Props) {
    const [isClosed, close] = useCloseUiComponent();

    const itemStyles = clsx(
        'flex cursor-pointer items-center gap-x-2 rounded px-2 py-1',
        'hover:bg-gray-600'
    );

    const handleStatusChange = (status: CommitmentStatus) => {
        onStatusChange(status);
        close();
    };

    const openComponent = (
        <button type="button" aria-label="Change status">
            {
                commitment.status === CommitmentStatus.NotStartedYet ? <NotStartedStatusMarker /> :
                commitment.status === CommitmentStatus.InProgress ? <InProgressStatusMarker /> :
                commitment.status === CommitmentStatus.Done ? <DoneStatusMarker /> :
                commitment.status === CommitmentStatus.Abandoned ? <AbandonedStatusMarker /> : null
            }
        </button>
    );

    return (
        <Popover close={isClosed} openComponent={openComponent}>
            <div className="space-y-2">
                <div onClick={() => handleStatusChange(CommitmentStatus.NotStartedYet)} className={itemStyles}>
                    <NotStartedStatusMarker /> Not started
                </div>
                <div onClick={() => handleStatusChange(CommitmentStatus.InProgress)} className={itemStyles}>
                    <InProgressStatusMarker /> In progress
                </div>
                <div onClick={() => handleStatusChange(CommitmentStatus.Done)} className={itemStyles}>
                    <DoneStatusMarker /> Done
                </div>
                <div className="w-full border-t border-neutral-600"></div>
                <div onClick={() => handleStatusChange(CommitmentStatus.Abandoned)} className={itemStyles}>
                    <AbandonedStatusMarker /> Abandon
                </div>
            </div>
        </Popover>
    );
}
