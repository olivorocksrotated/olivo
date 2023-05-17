import PageTitle from '@/app/components/page-title';
import { getServerSession } from '@/lib/auth/session';
import { getMoods } from '@/lib/moods/get';

import MoodTrend from './components/mood-trends';
import MoodsList from './components/moods-list';

export default async function Moods() {
    const { user } = await getServerSession();
    const moodsForList = await getMoods({
        userId: user.id,
        filters: { from: 'last week' }
    });
    const moodsForTrend = await getMoods({
        userId: user.id,
        filters: { from: 'last week' },
        order: 'asc'
    });

    const hasMoods = moodsForList.length !== 0;
    const noMoods = (
        <div>You do not have any moods yet</div>
    );

    return (
        <main>
            <PageTitle text="Your mood" />
            {!hasMoods ? noMoods :
            <div className="flex flex-col-reverse gap-12 sm:flex-row sm:align-top">
                <div><MoodsList moods={moodsForList} /></div>
                <div className="max-w-3xl grow"><MoodTrend moods={moodsForTrend} /></div>
            </div>}
        </main>
    );
}
