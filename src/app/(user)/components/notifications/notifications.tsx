
import { getServerSession } from '@/lib/auth/session';
import { getCommitments } from '@/lib/commitments/get';

import NotificationsClient from './notifications-client';

export default async function Notifications() {
    const { user } = await getServerSession();
    const commitments = await getCommitments({
        userId: user.id,
        filters: {
            status: 'to-do'
        }
    });

    return <NotificationsClient commitments={commitments} />;
}
