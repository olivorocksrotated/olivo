import { NotificationType } from '@prisma/client';

import { formatRelativeDateWithTime } from '@/lib/date/format';

import UnfinishedCommitmentsNotification from './templates/unfinished-commitments';
import { NotificationItem, UnfinishedCommitmentsNotificationType } from './types';

interface Props {
    notification: NotificationItem;
}

export default function NotificationEntry({ notification }: Props) {
    const now = new Date();

    return (
        <div>
            <div className="font-medium">{notification.title}</div>
            <div className="mb-3 text-xs text-gray-400">
                {formatRelativeDateWithTime(notification.createdAt, now)}
            </div>
            <div className="text-sm font-normal">
                {notification.type === NotificationType.UnfinishedCommitments ? <UnfinishedCommitmentsNotification notification={notification as UnfinishedCommitmentsNotificationType} /> : null}
            </div>
        </div>
    );
}
