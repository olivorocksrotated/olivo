import { todayAtHour } from '@/lib/date/days';
import { sendDesktopNotification } from '@/lib/notifications/desktop';

import useScheduler from './useScheduler';

export default function useScheduleNotifications() {
    useScheduler(() => {
        sendDesktopNotification({
            title: 'Good morning!',
            options: {
                body: 'Did you check your open commitments?',
                icon: '/favicon.ico'
            }
        });
    }, todayAtHour(10).timeUntilMoment);

    useScheduler(() => {
        sendDesktopNotification({
            title: 'The end of the day is here',
            options: {
                body: 'Did you check your open commitments?',
                icon: '/favicon.ico'
            }
        });
    }, todayAtHour(16).timeUntilMoment);
}
