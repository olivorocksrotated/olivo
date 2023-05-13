import { getServerSession } from '@/lib/auth/session';
import { getCommitmentsByUser } from '@/lib/commitments/get';
import { getFirstName } from '@/lib/name/name';

import PageTitle from '../components/page-title';
import CommitmentsSection from './commitments/components/commitments-section';
import NextMeetingCard from './components/next-meeting-card';

export default async function Home() {
    const { user } = await getServerSession();
    const firstName = getFirstName(user.name);

    const commitments = await getCommitmentsByUser(user.id, { today: true });

    return (
        <main>
            <PageTitle text={`👋 Hey, ${firstName}`} />
            <div className="mb-10">{await NextMeetingCard()}</div>
            <div>{await CommitmentsSection({ commitments, title: 'Commitments for today' })}</div>
        </main>
    );
}
