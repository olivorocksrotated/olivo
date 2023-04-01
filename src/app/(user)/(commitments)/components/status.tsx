import { CommitmentStatus } from '@prisma/client';

export default function Status({ status }: { status: CommitmentStatus }) {
    const statusLabel =
        status === CommitmentStatus.NotStartedYet ? 'Not started yet' :
        status === CommitmentStatus.InProgress ? 'In progress' :
        status === CommitmentStatus.Done ? 'Done' :
        status === CommitmentStatus.Abandoned ? 'Abandoned' : '-';


    return (
        <span>{statusLabel}</span>
    );
}
