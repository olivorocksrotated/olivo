'use client';

import { Commitment as CommitmentModel } from '@prisma/client';

import Actions from './actions';

type Commitment = Pick<CommitmentModel, 'id' | 'status' | 'doneBy' | 'title'>;
interface Props {
    commitment: Commitment;
}

export default function CommitmentEntry({ commitment }: Props) {
    const handleOnStart = () => undefined;

    return (
        <tr key={commitment.id} className="border-b bg-gray-800 border-gray-700 hover:bg-gray-600">
            <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                {commitment.title}
            </th>
            <td className="px-6 py-4 w-44">
                {commitment.doneBy.toDateString()}
            </td>
            <td className="px-6 py-4 w-52">
                <Actions commitment={commitment} onStart={handleOnStart} />
            </td>
        </tr>
    );
}
