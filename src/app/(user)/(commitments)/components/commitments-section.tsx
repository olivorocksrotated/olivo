import { getServerSession } from '@/lib/auth/session';
import { getCommitmentsByUser } from '@/lib/commitments/get';

import AddCommitmentButton from './add-commitment-btn';
import CommitmentsList from './commitments-list';

export default async function CommitmentsSection() {
    const { user } = await getServerSession();
    const commitments = await getCommitmentsByUser(user.id);

    return (
        <div className="max-w-2xl rounded-lg border border-gray-700 bg-gray-800 p-4 shadow sm:p-8">
            <div className="mb-4 flex items-baseline justify-between">
                <div className="mb-4 text-xl font-bold leading-none text-white">Your commitments</div>
                <div><AddCommitmentButton /></div>
            </div>
            <div className="flow-root">
                <CommitmentsList commitments={commitments} />
            </div>
        </div>
    );
}
