'use client';

import { NotificationType } from '@prisma/client';
import { useContext } from 'react';

import { formatRelativeDateWithTime } from '@/lib/date/format';

import { NotificationDataContext } from './contexts/notification-data.context';
import UnfinishedCommitmentsNotification from './templates/unfinished-commitments';

export default function NotificationEntry() {
    const { notification } = useContext(NotificationDataContext);

    const now = new Date();

    return (
        <div>
            <div className="font-medium">{notification.title}</div>
            <div className="mb-3 text-xs text-gray-400">
                {formatRelativeDateWithTime(notification.createdAt, now)}
            </div>
            <div>
                {notification.type === NotificationType.UnfinishedCommitments ? <UnfinishedCommitmentsNotification /> : null}
            </div>
        </div>
    );
}
