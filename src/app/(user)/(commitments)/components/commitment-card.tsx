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

    const handleStatusChange = async (status: CommitmentStatus) => {
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
                <div className="min-w-0 flex-1">
                    <p className="truncate font-medium text-white">
                        <span className="text-gray-400">I will</span> {commitment.title}
                    </p>
                    <p className="truncate text-sm text-gray-400">
                        By {formatRelativeDate(new Date(commitment.doneBy), now)}
                    </p>
                </div>
                <div className="inline-flex items-center text-base font-semibold text-white">
                    <Actions commitment={commitment}
                        onStatusChanged={handleStatusChange}
                        onDelete={() => handleStatusChange(CommitmentStatus.Abandoned)}
                    />
                </div>
            </div>
        </li>
    );
}
