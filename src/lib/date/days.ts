import { add, lastDayOfMonth, startOfMonth, sub } from 'date-fns';

export function todayAtZeroHourUTC() {
    return new Date(new Date().setUTCHours(0, 0, 0, 0));
}

export function todayAtMidnightUTC() {
    return new Date(new Date().setUTCHours(24, 0, 0, 0));
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
