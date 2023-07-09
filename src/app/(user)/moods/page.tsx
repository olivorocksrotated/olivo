import { getServerSession } from '@/lib/auth/session';
import { getMoods } from '@/lib/moods/get';

import MoodBullet from './components/mood-bullet';
import MoodLine from './components/mood-line';

export default async function Moods() {
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
        <div className="flex flex-col gap-12 sm:flex-row sm:align-top">
            <MoodBullet moods={thisMonthMoods} />
            <MoodLine thisMonthMoods={thisMonthMoods} lastMonthMoods={lastMonthMoods} />
        </div>;
}
