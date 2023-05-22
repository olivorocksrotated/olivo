import { getServerSession } from '@/lib/auth/session';
import { getCommitmentsByUser } from '@/lib/commitments/get';

import CommitmentsSection from './components/commitments-section';

export default async function Commitments() {
    const { user } = await getServerSession();
    const commitments = await getCommitmentsByUser({ userId: user.id });

    const hasCommitments = commitments.length !== 0;
    const noCommitments = (
        <div>You do not have any commitments yet</div>
    );

    /* @ts-expect-error Server Component */
    return !hasCommitments ? noCommitments : <CommitmentsSection commitments={commitments} title="Your commitments" />;
}
