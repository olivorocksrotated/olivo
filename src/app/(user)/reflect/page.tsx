import { getServerSession } from '@/lib/auth/session';
import { getMoods } from '@/lib/moods/get';

import MoodBullet from './components/mood-bullet';
import MoodSummary from './components/mood-summary';
import MoodTrends from './components/mood-trends';

export default async function Reflect() {
    const { user } = await getServerSession();
    const thisMonthMoods = await getMoods({
        userId: user.id,
        filters: { created: 'this month' },
        order: 'asc'
    });

    const lastMonthMoods = await getMoods({
        userId: user.id,
        filters: { created: 'last month' },
        order: 'asc'
    });

    const hasMoods = thisMonthMoods.length !== 0;
    const noMoods = (
        <div>You do not have any moods yet</div>
    );

    return !hasMoods ? noMoods :
        <>
            <div className="mb-8 flex flex-col gap-8 sm:flex-row sm:align-top">
                <MoodBullet moods={thisMonthMoods} />
                <MoodTrends thisMonthMoods={thisMonthMoods} lastMonthMoods={lastMonthMoods} />
            </div>
            <MoodSummary thisMonthMoods={thisMonthMoods} lastMonthMoods={lastMonthMoods} />
        </>;
}
