import { getServerSession } from '@/lib/auth/session';
import { getCommitmentsByUser } from '@/lib/commitments/get';

export default async function CommitmentsList() {
    const { user } = await getServerSession();
    const commitments = [...await getCommitmentsByUser(user.id)];

    return (
        <div className="relative overflow-x-auto shadow-md sm:rounded">
            <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                    <tr>
                        <th scope="col" className="px-6 py-3">
                            Commitment
                        </th>
                        <th scope="col" className="px-6 py-3">
                            By when
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Status
                        </th>
                        <th scope="col" className="px-6 py-3">
                            <span className="sr-only">Actions</span>
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {commitments.map((commitment) => (
                        <tr key={commitment.id} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                            <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                {commitment.title}
                            </th>
                            <td className="px-6 py-4">
                                {commitment.doneBy.toDateString()}
                            </td>
                            <td className="px-6 py-4">
                                {commitment.status}
                            </td>
                            <td className="px-6 py-4 text-right">
                                <a href="#" className="font-medium text-blue-600 dark:text-blue-500 hover:underline">Edit</a>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}
