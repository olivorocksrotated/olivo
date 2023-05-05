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
        setCommitment({ ...commitment, status });
        await fetchFromApi({
            method: HttpMethod.PUT,
            path: ResourcePath.Commitments,
            attachToPath: `/${commitment.id}`,
            body: { status }
        });
    };

    return (
        <li className="py-3 sm:py-4">
            <div className="flex items-center space-x-4">
                <div className="flex-1 min-w-0">
                    <p className="text-md font-medium truncate text-white">
                        <span className="text-gray-400">I will</span> {commitment.title}
                    </p>
                    <p className="text-sm truncate text-gray-400">
                        By {formatRelativeDate(new Date(commitment.doneBy), now)}
                    </p>
                </div>
                <div className="inline-flex items-center text-base font-semibold text-white">
                    <Actions commitment={commitment}
                        onStart={handleStatusChange(CommitmentStatus.InProgress)}
                        onDone={handleStatusChange(CommitmentStatus.Done)}
                        onDelete={handleStatusChange(CommitmentStatus.Abandoned)}
                    />
                </div>
            </div>
        </li>
    );
}
