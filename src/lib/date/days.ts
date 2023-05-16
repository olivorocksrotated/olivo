import { add, sub } from 'date-fns';

export function todayAtZeroHourUTC() {
    return new Date(new Date().setUTCHours(0, 0, 0, 0));
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
