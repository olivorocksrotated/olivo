import { add, isAfter, isBefore, isSameDay, lastDayOfMonth, startOfMonth, sub } from 'date-fns';

export function todayAtZeroHourUTC() {
    return new Date(new Date().setUTCHours(0, 0, 0, 0));
}

export function todayAtMidnightUTC() {
    return new Date(new Date().setUTCHours(24, 0, 0, 0));
}

export function todayAtLocalHour(hour: number) {
    const now = new Date();

    return new Date(now.getFullYear(), now.getMonth(), now.getDate(), hour, 0, 0);
}

export function yesterdayAtZeroHourUTC() {
    return sub(todayAtZeroHourUTC(), { days: 1 });
}

export function tomorrowAtZeroHourUTC() {
    return add(todayAtZeroHourUTC(), { days: 1 });
}

export function lastWeekFromTodayAtZeroHourUTC() {
    return sub(todayAtZeroHourUTC(), { weeks: 1 });
}

export function monthsFirstDayAtZeroHourUTC(monthsBehind: number = 0) {
    const referrenceDate = monthsBehind === 0 ? todayAtZeroHourUTC() : sub(todayAtZeroHourUTC(), { months: monthsBehind });

    return startOfMonth(referrenceDate);
}

export function monthsFirstDayAtMidnightUTC(monthsBehind: number = 0) {
    const referrenceDate = monthsBehind === 0 ? todayAtMidnightUTC() : sub(todayAtMidnightUTC(), { months: monthsBehind });

    return startOfMonth(referrenceDate);
}

export function monthsLastDayAtZeroHourUTC(monthsBehind: number = 0) {
    const referrenceDate = monthsBehind === 0 ? todayAtZeroHourUTC() : sub(todayAtZeroHourUTC(), { months: monthsBehind });

    return lastDayOfMonth(referrenceDate);
}

export function monthsLastDayAtMidnightUTC(monthsBehind: number = 0) {
    const referrenceDate = monthsBehind === 0 ? todayAtMidnightUTC() : sub(todayAtMidnightUTC(), { months: monthsBehind });

    return lastDayOfMonth(referrenceDate);
}

export function isBetween(date: Date, startDate: Date, endDate: Date) {
    return (
        (isAfter(date, startDate) || isSameDay(date, startDate)) &&
        (isBefore(date, endDate) || isSameDay(date, endDate))
    );
}

export function findDateTimeframe({ dateToFind, timeframes }: {
    dateToFind: Date,
    timeframes: Date[]
}): {
    startTimeframe: { index: number, date: Date },
    endTimeframe: { index: number, date: Date }
} | null {
    const startTimeframeIndex = timeframes.findIndex((startTimeframe, index) => {
        const endTimeframe = timeframes[index + 1];
        const isLastTimeframe = index === timeframes.length - 1;

        return isLastTimeframe ? false : isBetween(dateToFind, startTimeframe, endTimeframe);
    });

    const timeframeFound = startTimeframeIndex !== -1;

    return timeframeFound ? {
        startTimeframe: { index: startTimeframeIndex, date: timeframes[startTimeframeIndex] },
        endTimeframe: { index: startTimeframeIndex + 1, date: timeframes[startTimeframeIndex + 1] }
    } : null;
}
