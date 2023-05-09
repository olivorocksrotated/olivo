import { getServerSession } from '@/lib/auth/session';
import { getCommitmentsByUser } from '@/lib/commitments/get';

import AddCommitmentButton from './add-commitment-btn';
import CommitmentsList from './commitments-list';

export default async function CommitmentsSection() {
    const { user } = await getServerSession();
    const commitments = await getCommitmentsByUser(user.id);

    return (
        <div className="max-w-2xl p-4 border rounded-lg shadow sm:p-8 bg-gray-800 border-gray-700">
            <div className="flex items-baseline justify-between mb-4">
                <div className="text-xl font-bold leading-none text-white mb-4">Your commitments</div>
                <div><AddCommitmentButton /></div>
            </div>
            <div className="flow-root">
                <CommitmentsList commitments={commitments} />
            </div>
        </div>
    );
}
