import { getServerSession } from '@/lib/auth/session';
import { getCommitments } from '@/lib/commitments/get';

import CommitmentsSection from './components/commitments-section';

export default async function Commitments() {
    const { user } = await getServerSession();
    const commitments = await getCommitments({ userId: user.id });

    const hasCommitments = commitments.length !== 0;
    const noCommitments = (
        <div>You do not have any commitments yet</div>
    );

    return !hasCommitments ? noCommitments : <CommitmentsSection commitments={commitments} title="Your commitments" />;
}
