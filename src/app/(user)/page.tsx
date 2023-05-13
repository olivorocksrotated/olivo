import { getServerSession } from '@/lib/auth/session';
import { getFirstName } from '@/lib/name/name';

import PageTitle from '../components/page-title';
import CommitmentsSection from './(commitments)/components/commitments-section';
import NextMeetingCard from './components/next-meeting-card';

export default async function Home() {
    const session = await getServerSession();
    const firstName = getFirstName(session.user.name ?? '');

    return (
        <main>
            <PageTitle text={`👋 Hey, ${firstName}`} />
            <div className="mb-10">{await NextMeetingCard()}</div>
            <div>{await CommitmentsSection()}</div>
        </main>
    );
}
