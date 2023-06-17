'use client';

import { Commitment, CommitmentStatus } from '@prisma/client';

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
        </Popover>
    );
}
