'use client';

import { NotificationStatus } from '@prisma/client';
import clsx from 'clsx';
import { useEffect, useState } from 'react';
import { IoMdNotifications } from 'react-icons/io';
import { useZact } from 'zact/client';

import { useCloseUiComponent } from '@/app/components/ui/hooks/useCloseUiComponent';
import IconButton from '@/app/components/ui/icon-button/icon-button';
import Popover from '@/app/components/ui/popover/popover';
import useInterval from '@/lib/hooks/useInterval';
import { fetchFromApi, ResourcePath } from '@/lib/http/fetch';
import { HttpMethod } from '@/lib/http/types';
import { markAllNotificationsAsReadAction } from '@/lib/notifications/persistent/update';

import useRequestDesktopPermission from './hooks/useRequestDesktopPermission';
import NotificationEntry from './notification-entry';
import { NotificationItem } from './types';

const isNotificationOpen = (notification: Pick<NotificationItem, 'status'>) => notification.status === NotificationStatus.Open;

export default function Notifications() {
    useRequestDesktopPermission();

    const [isClosed] = useCloseUiComponent();
    const [notifications, setNotifications] = useState<NotificationItem[]>([]);

    const tenMinutes = 60 * 1000 * 10;

    const fetchNotifications = async () => {
        const newNotificationsResponse = await fetchFromApi({
            method: HttpMethod.GET,
            path: ResourcePath.Notifications
        });
        setNotifications(await newNotificationsResponse.json());
    };

    useEffect(() => {
        fetchNotifications();
    }, []);
    useInterval(async () => fetchNotifications(), tenMinutes);

    const hasOpenNotifications = notifications.some(isNotificationOpen);

    const { mutate: markAllAsRead } = useZact(markAllNotificationsAsReadAction);

    const handleCloseNotifications = () => {
        if (hasOpenNotifications) {
            markAllAsRead(null);
        }
    };

    return (
        <Popover
            align="end"
            sideOffset={4}
            close={isClosed}
            openComponent={
                <IconButton
                    icon={IoMdNotifications}
                    label="Open notifications"
                    ping={hasOpenNotifications}
                    size="s"
                    aria-controls="notifications"
                />
            }
            onClose={handleCloseNotifications}
        >
            <div
                className="h-52 max-h-96 max-w-xs overflow-y-auto sm:w-96 sm:max-w-none"
            >
                {notifications.length > 0 ? (
                    <ul role="list" className="divide-y divide-gray-600">
                        {notifications.map((notification) => (
                            <li
                                key={notification.id} role="listitem" className={clsx(
                                    'mb-4 rounded p-3 sm:p-4',
                                    { 'outline outline-indigo-500': isNotificationOpen(notification) }
                                )}
                            >
                                <NotificationEntry notification={notification} />
                            </li>
                        ))}
                    </ul>) :
                    <div className="p-2">You do not have any notifications yet</div>}
            </div>
        </Popover>
    );
}
