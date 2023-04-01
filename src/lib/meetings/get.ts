import { addDays, addMinutes, addMonths, addWeeks, differenceInMilliseconds, isAfter } from 'date-fns';

import { Meeting, MeetingDescription } from './types';

function getDate(occurrence: Date, unit: string, countNumber: number) {
    switch (unit) {
    case 'days':
        return addDays(occurrence, countNumber);
    case 'weeks':
        return addWeeks(occurrence, countNumber);
    case 'months':
        return addMonths(occurrence, countNumber);
    default:
        throw new Error('Invalid interval unit');
    }
}

function nextOccurrence(meetingDescription: MeetingDescription, currentDate: Date): Date | null {
    const startDate = meetingDescription.startDate;

    const [count, unit] = meetingDescription.interval.split(' ');
    const countNumber = parseInt(count, 10);

    let nextDate = startDate;
    while (isAfter(currentDate, nextDate)) {
        nextDate = getDate(nextDate, unit, countNumber);
    }

    // Adjust the time of the next occurrence based on the startDate's time
    nextDate.setHours(startDate.getHours());
    nextDate.setMinutes(startDate.getMinutes());
    nextDate.setSeconds(startDate.getSeconds());
    nextDate.setMilliseconds(startDate.getMilliseconds());

    return nextDate;
}

function closestDateIndex(dates: Date[], currentDate: Date): number | null {
    if (dates.length === 0) {
        return null;
    }

    let index = 0;
    let closest = index;
    let minDifference = Math.abs(differenceInMilliseconds(currentDate, dates[index]));

    for (const date of dates.slice(1)) {
        index = index + 1;
        const difference = Math.abs(differenceInMilliseconds(currentDate, date));
        if (difference < minDifference) {
            minDifference = difference;

            closest = index;
        }
    }

    return closest;
}

export function calculateNextMeeting(meetingDescriptions: MeetingDescription[]): Meeting | null {
    const currentDate = new Date();
    const nextMeetingsByUser = meetingDescriptions.map((meetingDescription) => {
        const nextOccurrenceForReport = nextOccurrence(meetingDescription, currentDate);
        if (!nextOccurrenceForReport) {
            return null;
        }

        return {
            startDate: nextOccurrenceForReport,
            endDate: addMinutes(nextOccurrenceForReport, meetingDescription.duration),
            report: meetingDescription.report
        };
    }).filter((meeting) => meeting !== null) as Meeting[];

    const dates = nextMeetingsByUser.map(({ startDate }) => startDate);
    const closestMeetingIndex = closestDateIndex(dates, currentDate);

    return closestMeetingIndex !== null ? nextMeetingsByUser[closestMeetingIndex] : null;
}

// Example usage
const meetingDescriptions: MeetingDescription[] = [
    {
        startDate: new Date('2023-03-29T14:30:00'), // Meeting starts at 14:30
        interval: '2 weeks',
        duration: 10,
        report: 'Amit'
    },
    {
        startDate: new Date('2023-03-29T15:30:00'), // Meeting starts at 13:30
        interval: '1 weeks',
        duration: 10,
        report: 'Rafa'
    }
];

/* eslint-disable */
export async function getNextMeetingByUser(_userId: string) {
    return calculateNextMeeting(meetingDescriptions);
}
