'use client';

import { Commitment as CommitmentModel, CommitmentStatus } from '@prisma/client';
import { useState } from 'react';

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
    const now = new Date();

    const handleStatusChange = (status: CommitmentStatus) => async () => {
        await fetchFromApi({
            method: HttpMethod.PUT,
            path: ResourcePath.Commitments,
            attachToPath: `/${commitment.id}`,
            body: { status }
        });

        setCommitment({ ...commitment, status });
    };

    return (
        <div className="max-w-sm p-6 border rounded-lg shadow bg-gray-800 border-gray-700">
            <h5 className="mb-2 text-2xl font-bold tracking-tight text-white">
                <span className="text-gray-400">I will</span> {commitment.title}
            </h5>
            <p className="mb-3 font-normal text-gray-400">
                By {formatRelativeDate(new Date(commitment.doneBy), now)}
            </p>
            <div className="flex items-center justify-between">
                <Actions commitment={commitment}
                    onStart={handleStatusChange(CommitmentStatus.InProgress)}
                    onDone={handleStatusChange(CommitmentStatus.Done)}
                    onDelete={handleStatusChange(CommitmentStatus.Abandoned)}
                />
            </div>
        </div>
    );
}
