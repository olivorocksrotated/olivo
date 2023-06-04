import { NotificationType } from '@prisma/client';

import { getRelativeDate } from '@/lib/date/format';

import SignupWelcomeNotification from './templates/signup-welcome';
import UnfinishedCommitmentsNotification from './templates/unfinished-commitments';
import { NotificationItem, SignupWelcomeNotificationType, UnfinishedCommitmentsNotificationType } from './types';

interface Props {
    notification: NotificationItem;
}

export default function NotificationEntry({ notification }: Props) {
    const now = new Date();

    return (
        <div>
            <div className="font-medium">{notification.title}</div>
            <div className="mb-3 text-xs text-gray-400">
                {getRelativeDate(notification.createdAt, now)}
            </div>
            <div className="text-sm font-normal">
                {notification.type === NotificationType.UnfinishedCommitments ? <UnfinishedCommitmentsNotification notification={notification as UnfinishedCommitmentsNotificationType} /> : null}
                {notification.type === NotificationType.SignupWelcome ? <SignupWelcomeNotification notification={notification as SignupWelcomeNotificationType} /> : null}
            </div>
        </div>
    );
}
