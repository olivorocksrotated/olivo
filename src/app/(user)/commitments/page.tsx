import { getServerSession } from '@/lib/auth/session';
import { getCommitments } from '@/lib/commitments/get';

import NewCommitmentsList from './components/list/new-commitments-list';

export default async function Commitments() {
    const { user } = await getServerSession();
    const commitments = await getCommitments({ userId: user.id });

    return <NewCommitmentsList commitments={commitments} />;
}
