import { getServerSession } from '@/lib/auth/session';
import { getCommitments } from '@/lib/commitments/get';

import CommitmentsList from './components/list/commitments-list';
import CommitmentsTabs from './components/list/commitments-tabs';

export default async function Commitments() {
    const { user } = await getServerSession();
    const commitments = await getCommitments({ userId: user.id });

    return (
        <>
            <CommitmentsTabs today={commitments} next={commitments} overdue={commitments} resolved={commitments} />
            <CommitmentsList commitments={commitments} />
        </>
    );
}
