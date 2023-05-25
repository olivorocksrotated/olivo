import { Commitment } from '@prisma/client';
import { useEffect, useState } from 'react';

import { todayAtHour } from '@/lib/date/days';
import { sendDesktopNotification } from '@/lib/notifications/desktop';

type NotificationCommitment = Pick<Commitment, 'doneBy'>;
type ScheduledNotifications = {
    [id: string]: NodeJS.Timeout | undefined
}

const isInTheFuture = (millisecondsLeft: number) => millisecondsLeft > 0;
const hasOpenCommitments = (commitments: NotificationCommitment[]) => commitments.length > 0;
const conditionalSchedule = (condition: boolean) => (callback: Function, milliseconds: number) => {
    if (condition) {
        return setTimeout(() => callback(), milliseconds);
    }
};

export default function useScheduleNotifications({ commitments }: {
    commitments: NotificationCommitment[]
}) {
    const [scheduledNotifications, setScheduledNotifications] = useState({} as ScheduledNotifications);

    useEffect(() => {
        const scheduleAndStore = (callback: Function, { id, milliseconds }: { id: string, milliseconds: number }) => {
            clearTimeout(scheduledNotifications[id]);
            const timer = conditionalSchedule(isInTheFuture(milliseconds) && hasOpenCommitments(commitments))(() => callback(), milliseconds);
            setScheduledNotifications((previous) => ({ ...previous, [id]: timer }));
        };

        scheduleAndStore(() => {
            sendDesktopNotification({
                title: 'Good morning!',
                options: {
                    body: 'Did you check your open commitments?',
                    icon: '/favicon.ico'
                }
            });
        }, {
            id: 'start-of-day-commitments',
            milliseconds: todayAtHour(10).timeUntilMoment
        });

        scheduleAndStore(() => {
            sendDesktopNotification({
                title: 'The end of the day is here',
                options: {
                    body: 'Did you check your open commitments?',
                    icon: '/favicon.ico'
                }
            });
        }, {
            id: 'end-of-day-commitments',
            milliseconds: todayAtHour(16).timeUntilMoment
        });
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [commitments]);
}
