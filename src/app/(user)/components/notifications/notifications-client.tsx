'use client';

import { NotificationStatus } from '@prisma/client';
import clsx from 'clsx';
import { AnimatePresence, motion } from 'framer-motion';
import { useState } from 'react';
import { IoMdNotifications } from 'react-icons/io';
import { useZact } from 'zact/client';

import IconButton from '@/app/components/ui/icon-button/icon-button';
import useInterval from '@/lib/hooks/useInterval';
import { fetchFromApi, ResourcePath } from '@/lib/http/fetch';
import { HttpMethod } from '@/lib/http/types';
import { markAllNotificationsAsReadAction } from '@/lib/notifications/persistent/update';

import useRequestDesktopPermission from './hooks/useRequestDesktopPermission';
import useScheduleNotifications from './hooks/useScheduleNotifications';
import NotificationEntry from './notification-entry';
import { NotificationCommitment, NotificationItem } from './types';

interface Props {
    unfinishedCommitmentsForToday: NotificationCommitment[];
    notifications: NotificationItem[]
}

const isNotificationOpen = (notification: Pick<NotificationItem, 'status'>) => notification.status === NotificationStatus.Open;

export default function NotificationsClient({ unfinishedCommitmentsForToday, notifications: initialNotifications }: Props) {
    useRequestDesktopPermission();
    useScheduleNotifications({ unfinishedCommitmentsForToday });

    const [isOpen, setIsOpen] = useState(false);
    const [notifications, setNotifications] = useState(initialNotifications);

    const fiveMinutes = 60 * 1000 * 5;

    useInterval(async () => {
        const newNotificationsResponse = await fetchFromApi({
            method: HttpMethod.GET,
            path: ResourcePath.Notifications
        });
        setNotifications(await newNotificationsResponse.json());
    }, fiveMinutes);

    const hasOpenNotifications = notifications.some(isNotificationOpen);

    const asideStyle = clsx(
        'fixed right-0 top-0 z-40 h-screen w-56 transition-transform',
        'sm:w-96',
        { 'translate-x-full': !isOpen },
        { '-translate-x-0': isOpen }
    );
    const buttonStyle = clsx(
        'inline-flex items-center',
        'sm:absolute sm:right-0 sm:top-0 sm:mr-6 sm:mt-6'
    );

    const { mutate: markAllAsRead } = useZact(markAllNotificationsAsReadAction);

    const handleCloseNotifications = () => {
        setIsOpen(false);
        if (hasOpenNotifications) {
            markAllAsRead(null);
        }
    };

    return (
        <div>
            <div className={buttonStyle}>
                <IconButton icon={IoMdNotifications}
                    onClick={() => setIsOpen(true)}
                    label="Open notifications"
                    ping={hasOpenNotifications}
                    size="md"
                    data-drawer-target="notifications"
                    data-drawer-toggle="notifications"
                    aria-controls="notifications"
                />
            </div>

            <aside id="notifications" className={asideStyle} aria-label="Notifications">
                <div className="h-full overflow-y-auto px-3 py-4"
                    style={{
                        background: 'rgb(35, 37, 38)',
                        border: '1px solid hsla(0,0%,100%,.05)'
                    }}
                >
                    {notifications.length > 0 ? (
                        <ul role="list" className="divide-y divide-gray-600">
                            {notifications.map((notification) => (
                                <li key={notification.id} role="listitem" className={clsx(
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
            </aside>

            <AnimatePresence>
                {isOpen ? (
                    <motion.div key="notifications-backdrop"
                        onClick={handleCloseNotifications}
                        className="absolute left-0 top-0 z-10 h-screen w-screen bg-slate-900"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 0.6 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.2 }}
                    >
                    </motion.div>) : null}
            </AnimatePresence>
        </div>
    );
}
