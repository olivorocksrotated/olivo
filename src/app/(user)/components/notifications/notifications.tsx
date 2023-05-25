
import { getServerSession } from '@/lib/auth/session';
import { getCommitments } from '@/lib/commitments/get';
import { getNotifications } from '@/lib/notifications/persistent/get';

import NotificationsClient from './notifications-client';

export default async function Notifications() {
    const { user } = await getServerSession();
    const todoCommitments = await getCommitments({
        userId: user.id,
        filters: {
            status: 'to-do'
        }
    });
    const notifications = await getNotifications({ userId: user.id });

    return <NotificationsClient commitments={todoCommitments} notifications={notifications} />;
}
