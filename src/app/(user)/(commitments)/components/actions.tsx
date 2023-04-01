'use client';

import { Commitment as CommitmentModel, CommitmentStatus } from '@prisma/client';
import { AiFillPlayCircle, AiOutlineCheckCircle, AiOutlineFieldTime } from 'react-icons/ai';

type Commitment = Pick<CommitmentModel, 'status'>
interface Props {
    commitment: Commitment,
    onStart?: (commitment: Commitment) => void
    onDone?: (commitment: Commitment) => void
}

export default function Actions({
    commitment,
    onStart = () => undefined,
    onDone = () => undefined
}: Props) {
    const handleOnStart = () => onStart(commitment);
    const handleOnDone = () => onDone(commitment);

    const isStarted = commitment.status === CommitmentStatus.InProgress;
    const isDone = commitment.status === CommitmentStatus.Done;
    const styleDisabled = 'disabled:text-gray-400 disabled:border-gray-400 disabled:cursor-default disabled:cursor-not-allowed';

    const displayedActions = !isDone ?
        <>
            <div>
                <button onClick={handleOnStart}
                    type="button"
                    disabled={isStarted}
                    className={`rounded-full border p-1 pr-3 border-indigo-500 text-indigo-300 ${styleDisabled}`}
                >
                    {!isStarted ?
                        <><AiFillPlayCircle size={25} className="inline-block mr-2" />Start</> :
                        <><AiOutlineFieldTime size={25} className="inline-block mr-2" />In progress</>}
                </button>
            </div>
            <div>
                <button onClick={handleOnDone}
                    type="button"
                    disabled={!isStarted}
                    className={`rounded-full border p-1 border-green-500 text-green-300 ${styleDisabled}`}
                >
                    <AiOutlineCheckCircle size={25} />
                </button>
            </div>
        </> :
        <div className="rounded-full border p-1 pr-3 border-green-500 text-green-300">
            <AiOutlineCheckCircle size={25} className="inline-block mr-2" />Done
        </div>;

    return (
        <div className="flex items-center justify-end gap-3">
            {displayedActions}
        </div>
    );
}
