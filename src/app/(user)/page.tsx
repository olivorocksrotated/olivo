import { getServerSession } from '@/lib/auth/session';
import { getCommitments } from '@/lib/commitments/get';
import { getTodaysMood } from '@/lib/moods/get';
import { getFirstName } from '@/lib/name/name';

import PageTitle from '../components/page-title';
import CommitmentsSection from './commitments/components/commitments-section';
import MoodSelector from './moods/components/mood-selector';

export default async function Home() {
    const { user } = await getServerSession();
    const firstName = getFirstName(user.name);

    const todaysMood = await getTodaysMood(user.id);
    const commitments = await getCommitments({
        userId: user.id,
        filters: { doneBy: 'today and last 2 days' },
        order: 'desc'
    });

    return (
        <main>
            <PageTitle text={`👋 Hey, ${firstName}`} />
            <div className="mb-10"><MoodSelector todaysMood={todaysMood} /></div>
            <div><CommitmentsSection commitments={commitments} title="Commitments for today" /></div>
        </main>
    );
}
