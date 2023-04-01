'use client';

import { Commitment, CommitmentStatus } from '@prisma/client';
import { AiFillPlayCircle, AiOutlineCheckCircle, AiOutlineFieldTime } from 'react-icons/ai';

interface Props {
    commitment: Pick<Commitment, 'id' | 'status'>,
    onStart?: () => void
    onDone?: () => void
}

export default function Actions({
    commitment,
    onStart = () => undefined,
    onDone = () => undefined
}: Props) {
    const handleOnStart = () => {
        onStart();
    };

    const handleOnDone = () => {
        onDone();
    };

    const isStarted = commitment.status === CommitmentStatus.InProgress;
    const disabled = 'disabled:text-gray-400 disabled:border-gray-400 disabled:cursor-default';

    return (
        <div className="flex items-center justify-between">
            <div>
                <button onClick={handleOnStart}
                    type="button"
                    disabled={isStarted}
                    className={`rounded-full border p-1 pr-3 border-indigo-500 text-indigo-300 ${disabled}`}
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
                    className={`rounded-full border p-1 border-green-500 text-green-300 ${disabled}`}
                >
                    <AiOutlineCheckCircle size={25} />
                </button>
            </div>
        </div>
    );
}
