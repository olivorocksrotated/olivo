'use client';

import { Commitment, CommitmentStatus } from '@prisma/client';
import { AiFillPlayCircle, AiOutlineCheckCircle } from 'react-icons/ai';
import { GiSandsOfTime } from 'react-icons/gi';

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

    return (
        <div className="flex items-center justify-between">
            <div>
                <button onClick={handleOnStart} type="button" className="rounded-full border p-1 pr-3 border-indigo-500 text-indigo-300" disabled={isStarted}>
                    {!isStarted ?
                        <><AiFillPlayCircle size={25} className="inline-block mr-1" /> Start</> :
                        <><GiSandsOfTime size={25} className="inline-block mr-1" /> Started</>}
                </button>
            </div>
            <div>
                <button onClick={handleOnDone} type="button" className="rounded-full border p-1 border-green-500 text-green-300">
                    <AiOutlineCheckCircle size={25} />
                </button>
            </div>
        </div>
    );
}
