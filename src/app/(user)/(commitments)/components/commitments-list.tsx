import { getServerSession } from '@/lib/auth/session';
import { getCommitmentsByUser } from '@/lib/commitments/get';

import Actions from './actions';

export default async function CommitmentsList() {
    const { user } = await getServerSession();
    const commitments = [...await getCommitmentsByUser(user.id)];

    return (
        <div className="relative overflow-x-auto shadow-md rounded">
            <table className="w-full text-sm text-left text-gray-400">
                <thead className="text-xs uppercase bg-gray-700 text-gray-400">
                    <tr>
                        <th scope="col" className="px-6 py-3">
                            I will
                        </th>
                        <th scope="col" className="px-6 py-3">
                            By
                        </th>
                        <th scope="col" className="px-6 py-3">
                            <span className="sr-only">Actions</span>
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {commitments.map((commitment) => (
                        <tr key={commitment.id} className="border-b bg-gray-800 border-gray-700 hover:bg-gray-600">
                            <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                {commitment.title}
                            </th>
                            <td className="px-6 py-4 w-44">
                                {commitment.doneBy.toDateString()}
                            </td>
                            <td className="px-6 py-4 w-52">
                                <Actions commitment={commitment} />
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}
