import { AiExecutionName } from '@prisma/client';

import { getAiExecution } from '@/lib/ai/get';
import { getServerSession } from '@/lib/auth/session';
import { getMoodExecutionTimeframe } from '@/lib/moods/ai';
import { getMoods } from '@/lib/moods/get';

import MoodAi from './components/mood-ai';
import MoodBullet from './components/mood-bullet';
import MoodSummary from './components/mood-summary';
import MoodTrends from './components/mood-trends';

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

    const executionTimeframe = getMoodExecutionTimeframe();
    const lastSummaryExecution = await getAiExecution({
        userId: user.id,
        executionName: AiExecutionName.MoodSummary,
        createdAfter: executionTimeframe.startDate
    });
    const lastAdviceExecution = await getAiExecution({
        userId: user.id,
        executionName: AiExecutionName.MoodAdvice,
        createdAfter: executionTimeframe.startDate
    });

    const hasMoods = thisMonthMoods.length !== 0;
    const noMoods = (
        <div>You do not have any moods yet</div>
    );

    const positioningStyles = 'flex flex-col gap-8 sm:flex-row sm:align-top';

    return !hasMoods ? noMoods :
        <>
            <div className={`mb-8 ${positioningStyles}`}>
                <MoodBullet moods={thisMonthMoods} />
                <MoodTrends thisMonthMoods={thisMonthMoods} lastMonthMoods={lastMonthMoods} />
            </div>
            <div className={positioningStyles}>
                <MoodSummary thisMonthMoods={thisMonthMoods} lastMonthMoods={lastMonthMoods} />
                <MoodAi lastSummaryExecution={lastSummaryExecution} lastAdviceExecution={lastAdviceExecution} />
            </div>
        </>;
}
