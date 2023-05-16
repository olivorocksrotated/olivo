import { getServerSession } from '@/lib/auth/session';
import { getCommitmentsByUser } from '@/lib/commitments/get';
import { getTodaysMood } from '@/lib/moods/get';
import { getFirstName } from '@/lib/name/name';

import PageTitle from '../components/page-title';
import CommitmentsSection from './commitments/components/commitments-section';
import NextMeetingCard from './components/next-meeting-card';
import MoodSelector from './moods/mood-selector';

export default async function Home() {
    const { user } = await getServerSession();
    const firstName = getFirstName(user.name);

    const todaysMood = await getTodaysMood(user.id);
    const commitments = await getCommitmentsByUser(user.id, { today: true });

    return (
        <main>
            <PageTitle text={`👋 Hey, ${firstName}`} />
            <div className="mb-10"><MoodSelector todaysMood={todaysMood} /></div>
            <div className="mb-10">{await NextMeetingCard()}</div>
            <div>{await CommitmentsSection({ commitments, title: 'Commitments for today' })}</div>
        </main>
    );
}
