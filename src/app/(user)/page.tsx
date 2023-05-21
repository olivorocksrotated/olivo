import { getServerSession } from '@/lib/auth/session';
import { getCommitmentsByUser } from '@/lib/commitments/get';
import { getTodaysMood } from '@/lib/moods/get';
import { getFirstName } from '@/lib/name/name';

import PageTitle from '../components/page-title';
import CommitmentsSection from './commitments/components/commitments-section';
import NextMeetingCard from './components/next-meeting-card';
import MoodSelector from './moods/components/mood-selector';

export default async function Home() {
    const { user } = await getServerSession();
    const firstName = getFirstName(user.name);

    const todaysMood = await getTodaysMood(user.id);
    const commitments = await getCommitmentsByUser(user.id, { today: true });

    return (
        <main>
            <PageTitle text={`👋 Hey, ${firstName}`} />
            <div className="mb-10"><MoodSelector todaysMood={todaysMood} /></div>
            {/* @ts-expect-error Server Component */}
            <div className="mb-10"><NextMeetingCard /></div>
            {/* @ts-expect-error Server Component */}
            <div><CommitmentsSection commitments={commitments} title="Commitments for today" /></div>
        </main>
    );
}
