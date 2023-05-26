import { Prisma } from '@prisma/client';
import { useContext } from 'react';

import { NotificationDataContext } from '../contexts/notification-data.context';

export default function UnfinishedCommitmentsNotification() {
    const { notification } = useContext(NotificationDataContext);

    return (
        <div className="text-sm">{(notification.payload as Prisma.JsonObject)?.description as string}</div>
    );
}
