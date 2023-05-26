import { Prisma } from '@prisma/client';

import { NotificationItem } from '../types';

interface Props {
    notification: NotificationItem;
}

export default function UnfinishedCommitmentsNotification({ notification }: Props) {
    return (
        <div className="text-sm">{(notification.payload as Prisma.JsonObject)?.description as string}</div>
    );
}
