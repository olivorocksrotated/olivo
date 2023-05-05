import { getServerSession } from '@/lib/auth/session';
import { getCommitmentsByUser } from '@/lib/commitments/get';

import AddCommitmentButton from './add-commitment-btn';
import CommitmentCard from './commitment-card';

export default async function CommitmentsSection() {
    const { user } = await getServerSession();
    const commitments = await getCommitmentsByUser(user.id);

    return (
        <div>
            <div className="text-xl mb-4">Your commitments</div>
            <div className="py-10"><AddCommitmentButton /></div>
            <div className="max-w-2xl">
                <div className="relative overflow-x-auto shadow-md rounded">
                    {commitments.map((commitment) => <CommitmentCard key={commitment.id}
                        commitment={{ ...commitment, doneBy: commitment.doneBy.toString() }}
                    />)}
                </div>
            </div>
        </div>
    );
}
