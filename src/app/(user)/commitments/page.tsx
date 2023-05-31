import { getServerSession } from '@/lib/auth/session';
import { getCommitments } from '@/lib/commitments/get';

import CommitmentsSection from './components/commitments-section';

export default async function Commitments() {
    const { user } = await getServerSession();
    const commitments = await getCommitments({ userId: user.id });

    return <CommitmentsSection commitments={commitments} title="All your commitments" />;
}
