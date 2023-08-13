import { sub } from 'date-fns';

export function getMoodExecutionTimeframe() {
    const now = new Date();
    const twoWeeksAgo = sub(now, { weeks: 2 });

    return { startDate: twoWeeksAgo, endDate: now };
}
