import PageTitle from '@/app/components/page-title';
import { getServerSession } from '@/lib/auth/session';
import { getCommitmentsByUser } from '@/lib/commitments/get';

import CommitmentsSection from './components/commitments-section';

export default async function Commitments() {
    const { user } = await getServerSession();
    const commitments = await getCommitmentsByUser(user.id);

    const hasCommitments = commitments.length !== 0;
    const noCommitments = (
        <div>You do not have any commitments yet</div>
    );

    return (
        <main>
            <PageTitle text="Commitments" />
            {/* @ts-expect-error Server Component */}
            {!hasCommitments ? noCommitments : <CommitmentsSection commitments={commitments} title="Your commitments" />}
        </main>
    );
}
