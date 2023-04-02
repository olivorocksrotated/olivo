import { beforeEach, describe, expect, test, vi } from 'vitest';

import { calculateNextMeeting } from './get';
import { Meeting, MeetingDescription, Rythm } from './types';

describe('calculateNextMeeting', () => {
    const fakeCurrentDate = new Date(2023, 0, 1);
    beforeEach(() => {
        vi.useFakeTimers({ now: fakeCurrentDate });
    });

    test('returns the closest next meeting', async () => {
        const meetingDescriptions: MeetingDescription[] = [
            {
                startDate: new Date(2023, 0, 2),
                rythm: Rythm.everyDay,
                duration: 60,
                report: 'Report 1'
            },
            {
                startDate: new Date(2023, 0, 3),
                rythm: Rythm.everyDay,
                duration: 30,
                report: 'Report 2'
            }
        ];

        const result = calculateNextMeeting(meetingDescriptions);
        const expectedResult: Meeting = {
            startDate: new Date(2023, 0, 2),
            endDate: new Date(2023, 0, 2, 1),
            report: 'Report 1'
        };

        expect(result).toEqual(expectedResult);
    });

    test('returns the closest next meeting also when they are started in the past', async () => {
        const meetingDescriptions: MeetingDescription[] = [
            {
                startDate: new Date(2022, 11, 28, 12),
                rythm: Rythm.everyWeek,
                duration: 60,
                report: 'Report 1'
            },
            {
                startDate: new Date(2022, 11, 26, 12),
                rythm: Rythm.everyWeek,
                duration: 60,
                report: 'Report 2'
            }
        ];

        const result = calculateNextMeeting(meetingDescriptions);
        const expectedResult: Meeting = {
            startDate: new Date(2023, 0, 2, 12),
            endDate: new Date(2023, 0, 2, 13),
            report: 'Report 2'
        };

        expect(result).toEqual(expectedResult);
    });

    test('returns null when no next meeting is found', async () => {
        const result = calculateNextMeeting([]);
        expect(result).toBeNull();
    });
});