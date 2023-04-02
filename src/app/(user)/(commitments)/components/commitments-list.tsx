import { getServerSession } from '@/lib/auth/session';
import { getCommitmentsByUser } from '@/lib/commitments/get';

import Commitment from './commitment-entry';

export default async function CommitmentsList() {
    const { user } = await getServerSession();
    const commitments = await getCommitmentsByUser(user.id);

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
                    {commitments.map((commitment) => <Commitment key={commitment.id}
                        commitment={{ ...commitment, doneBy: commitment.doneBy.toString() }}
                    />)}
                </tbody>
            </table>
        </div>
    );
}
