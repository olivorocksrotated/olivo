import { addDays, addMinutes, addMonths, addWeeks, closestIndexTo, isAfter } from 'date-fns';

import { Meeting, MeetingDescription, Rythm } from './types';

function getDateFromRythm(occurrence: Date, rythm: Rythm) {
    switch (rythm) {
    case Rythm.EveryDay:
        return addDays(occurrence, 1);
    case Rythm.EveryOtherDay:
        return addDays(occurrence, 2);
    case Rythm.EveryWeek:
        return addWeeks(occurrence, 1);
    case Rythm.EveryOtherWeek:
        return addWeeks(occurrence, 2);
    case Rythm.EveryMonth:
        return addMonths(occurrence, 1);
    case Rythm.EveryOtherMonth:
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

export function calculateNextMeeting(meetingDescriptions: MeetingDescription[]): Meeting | null {
    if (meetingDescriptions.length === 0) {
        return null;
    }

    const currentDate = new Date();
    const nextMeetingsByUser = meetingDescriptions.reduce((meetings, meetingDescription) => {
        const nextOccurrenceForReport = nextOccurrence(meetingDescription, currentDate);

        return [
            ...meetings,
            ...!nextOccurrenceForReport ? [] : [{
                startDate: nextOccurrenceForReport,
                endDate: addMinutes(nextOccurrenceForReport, meetingDescription.duration),
                report: meetingDescription.report
            }]
        ];
    }, [] as Meeting[]);

    const dates = nextMeetingsByUser.map(({ startDate }) => startDate);
    const closestMeetingIndex = closestIndexTo(currentDate, dates);

    return closestMeetingIndex !== undefined ? nextMeetingsByUser[closestMeetingIndex] : null;
}

// Example usage
const meetingDescriptions: MeetingDescription[] = [
    {
        startDate: new Date('2023-03-29T14:30:00'), // Meeting starts at 14:30
        rythm: Rythm.EveryOtherMonth,
        duration: 10,
        report: 'Amit'
    },
    {
        startDate: new Date('2023-03-29T15:30:00'), // Meeting starts at 13:30
        rythm: Rythm.EveryMonth,
        duration: 10,
        report: 'Rafa'
    }
];

/* eslint-disable */
export async function getNextMeetingByUser(_userId: string) {
    return calculateNextMeeting(meetingDescriptions);
}
