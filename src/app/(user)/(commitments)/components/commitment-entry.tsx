'use client';

import { Commitment as CommitmentModel, CommitmentStatus } from '@prisma/client';
import { useState } from 'react';

import { fetchFromApi, ResourcePath } from '@/lib/http/fetch';
import { HttpMethod } from '@/lib/http/route';

import Actions from './actions';

type Commitment = Pick<CommitmentModel, 'id' | 'status' | 'doneBy' | 'title'>;
interface Props {
    commitment: Commitment;
}

export default function CommitmentEntry({ commitment }: Props) {
    const [thisCommitment, setThisCommitment] = useState(commitment);

    const handleStatusChange = (status: CommitmentStatus) => async () => {
        await fetchFromApi({
            method: HttpMethod.PUT,
            path: ResourcePath.Commitments,
            attachToPath: `/${commitment.id}`,
            body: { status }
        });

        setThisCommitment({ ...thisCommitment, status });
    };

    return (
        <tr className="border-b bg-gray-800 border-gray-700 hover:bg-gray-600">
            <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                {thisCommitment.title}
            </th>
            <td className="px-6 py-4 w-44">
                {thisCommitment.doneBy.toDateString()}
            </td>
            <td className="px-6 py-4 w-52">
                <Actions commitment={thisCommitment}
                    onStart={handleStatusChange(CommitmentStatus.InProgress)}
                    onDone={handleStatusChange(CommitmentStatus.Done)}
                />
            </td>
        </tr>
    );
}
