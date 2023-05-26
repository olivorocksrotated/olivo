import { NotificationType } from '@prisma/client';
import { useEffect, useState } from 'react';
import { useZact } from 'zact/client';

import { todayAtHour } from '@/lib/date/days';
import { createDesktopNotification } from '@/lib/notifications/desktop';
import { createNotificationAction } from '@/lib/notifications/persistent/create';

import { NotificationCommitment } from '../types';

type ScheduledNotifications = {
    [id: string]: NodeJS.Timeout | undefined
}

const isInTheFuture = (millisecondsLeft: number) => millisecondsLeft > 0;
const hasOpenCommitments = (commitments: NotificationCommitment[]) => commitments.length > 0;
const conditionalSchedule = (condition: boolean) => (callback: (id: string) => void, { id, milliseconds }: { id: string, milliseconds: number }) => {
    if (condition) {
        return setTimeout(() => callback(id), milliseconds);
    }
};

export default function useScheduleNotifications({ unfinishedCommitmentsForToday }: {
    unfinishedCommitmentsForToday: NotificationCommitment[]
}) {
    const [scheduledNotifications, setScheduledNotifications] = useState({} as ScheduledNotifications);

    const { mutate: createPersistentNotification } = useZact(createNotificationAction);

    useEffect(() => {
        const scheduleAndStore = (callback: (id: string) => void, { id, milliseconds }: { id: string, milliseconds: number }) => {
            clearTimeout(scheduledNotifications[id]);
            const timer = conditionalSchedule(isInTheFuture(milliseconds) && hasOpenCommitments(unfinishedCommitmentsForToday))(() => callback(id), { id, milliseconds });
            setScheduledNotifications((previous) => ({ ...previous, [id]: timer }));
        };

        scheduleAndStore((id: string) => {
            const title = '☀️ Good morning!';
            const description = `You still have ${unfinishedCommitmentsForToday.length} unfinished commitments`;
            createDesktopNotification({
                title,
                options: {
                    body: description,
                    image: '/favicon.ico',
                    requireInteraction: true,
                    tag: id
                }
            });

            createPersistentNotification({
                type: NotificationType.UnfinishedCommitments,
                title,
                payload: { unfinishedCommitments: unfinishedCommitmentsForToday.length }
            });
        }, {
            id: 'start-of-day-commitments',
            milliseconds: todayAtHour(10).timeUntilMoment
        });

        scheduleAndStore((id) => {
            const hasUnfinishedCommitments = unfinishedCommitmentsForToday.length > 0;
            const title = `${hasUnfinishedCommitments ? '🙋' : '🥳'} End of the day`;
            const description = `${hasUnfinishedCommitments ? `${unfinishedCommitmentsForToday.length} commitments left today` : 'All done today :)'}`;
            createDesktopNotification({
                title,
                options: {
                    body: description,
                    image: '/favicon.ico',
                    requireInteraction: true,
                    tag: id
                }
            });

            createPersistentNotification({
                type: NotificationType.UnfinishedCommitments,
                title,
                payload: { unfinishedCommitments: unfinishedCommitmentsForToday.length }
            });
        }, {
            id: 'end-of-day-commitments',
            milliseconds: todayAtHour(16).timeUntilMoment
        });
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [unfinishedCommitmentsForToday]);
}
