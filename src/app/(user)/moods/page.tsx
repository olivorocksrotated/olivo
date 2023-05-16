import PageTitle from '@/app/components/page-title';
import { getServerSession } from '@/lib/auth/session';
import { getMoods } from '@/lib/moods/get';

import MoodTrend from './components/mood-trends';
import MoodsList from './components/moods-list';

export default async function Moods() {
    const { user } = await getServerSession();
    const moods = await getMoods(user.id, { from: 'last week' });

    const hasMoods = moods.length !== 0;
    const noMoods = (
        <div>You do not have any moods yet</div>
    );

    return (
        <main>
            <PageTitle text="Your mood" />
            {!hasMoods ? noMoods :
            <div className="flex justify-between align-top">
                <div><MoodsList moods={moods} /></div>
                <div><MoodTrend moods={moods} /></div>
            </div>}
        </main>
    );
}
