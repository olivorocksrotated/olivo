import PageTitle from '@/app/components/page-title';
import { getServerSession } from '@/lib/auth/session';
import { getMoods } from '@/lib/moods/get';

import MoodMatrix from './components/matrix/mood-matrix';
import MoodTrend from './components/mood-trends';

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

    return (
        <main>
            <PageTitle text="Your mood" />
            {!hasMoods ? noMoods :
            <div>
                <div className="mb-8 text-lg">How you have been feeling this month</div>
                <div className="flex flex-col-reverse gap-12 sm:flex-row sm:align-top">
                    <div className="w-fit"><MoodMatrix moods={thisMonthMoods} /></div>
                    <div className="max-w-3xl grow"><MoodTrend thisMonthMoods={thisMonthMoods} lastMonthMoods={lastMonthMoods} /></div>
                </div>
            </div>}
        </main>
    );
}
