import { addDays, addMinutes, addMonths, addWeeks, differenceInMilliseconds, isAfter } from 'date-fns';

import { Meeting, MeetingDescription, Rythm } from './types';

function getDateFromRythm(occurrence: Date, rythm: Rythm) {
    switch (rythm) {
    case Rythm.everyDay:
        return addDays(occurrence, 1);
    case Rythm.everyOtherDay:
        return addDays(occurrence, 2);
    case Rythm.everyWeek:
        return addWeeks(occurrence, 1);
    case Rythm.everyOtherWeek:
        return addWeeks(occurrence, 2);
    case Rythm.everyMonth:
        return addMonths(occurrence, 1);
    case Rythm.everyOtherMonth:
        return addMonths(occurrence, 2);
    default:
        throw new Error('Invalid Meeting Rythm');
    }
}

function nextOccurrence(meetingDescription: MeetingDescription, currentDate: Date): Date | null {
    const startDate = meetingDescription.startDate;

    let nextDate = startDate;
    while (isAfter(currentDate, nextDate)) {
        nextDate = getDateFromRythm(nextDate, meetingDescription.rythm);
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
        rythm: Rythm.everyOtherMonth,
        duration: 10,
        report: 'Amit'
    },
    {
        startDate: new Date('2023-03-29T15:30:00'), // Meeting starts at 13:30
        rythm: Rythm.everyMonth,
        duration: 10,
        report: 'Rafa'
    }
];

/* eslint-disable */
export async function getNextMeetingByUser(_userId: string) {
    return calculateNextMeeting(meetingDescriptions);
}
