'use client';

import { Commitment, Notification, NotificationStatus, Prisma } from '@prisma/client';
import clsx from 'clsx';
import { AnimatePresence, motion } from 'framer-motion';
import { useState } from 'react';
import { IoMdNotifications } from 'react-icons/io';

import useRequestDesktopPermission from './hooks/useRequestDesktopPermission';
import useScheduleNotifications from './hooks/useScheduleNotifications';

interface Props {
    commitments: Pick<Commitment, 'doneBy'>[];
    notifications: Omit<Notification, 'ownerId'>[]
}

const isNotificationOpen = (notification: Pick<Notification, 'status'>) => notification.status === NotificationStatus.Open;

export default function NotificationsClient({ commitments, notifications }: Props) {
    useRequestDesktopPermission();
    useScheduleNotifications({ commitments });

    const [isOpen, setIsOpen] = useState(false);

    const hasOpenNotifications = notifications.some(isNotificationOpen);

    const asideStyle = clsx(
        'fixed right-0 top-0 z-40 h-screen w-56 transition-transform',
        'sm:w-96',
        { 'translate-x-full': !isOpen },
        { '-translate-x-0': isOpen }
    );
    const buttonStyle = clsx(
        'relative inline-flex items-center rounded-lg p-2 text-sm text-gray-400',
        'sm:absolute sm:right-0 sm:top-0 sm:mr-6 sm:mt-6',
        'hover:bg-gray-700',
        'focus:outline-none focus:ring-2 focus:ring-gray-600'
    );

    return (
        <div>
            <button onClick={() => setIsOpen(true)}
                data-drawer-target="notifications"
                data-drawer-toggle="notifications"
                aria-controls="notifications"
                type="button"
                className={buttonStyle}
            >
                <span className="sr-only">Open notifications</span>
                {hasOpenNotifications ? (
                    <span className="absolute right-0 top-0 flex h-3 w-3">
                        <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-red-400 opacity-75"></span>
                        <span className="relative inline-flex h-3 w-3 rounded-full bg-red-500"></span>
                    </span>
                ) : null}
                <IoMdNotifications size={25} />
            </button>

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
                                    { 'outline outline-red-200': isNotificationOpen(notification) }
                                )}
                                >
                                    <div>
                                        <div className="mb-2 font-medium">{notification.title}</div>
                                        <div className="text-sm">{(notification.payload as Prisma.JsonObject)?.description as string}</div>
                                    </div>
                                </li>
                            ))}
                        </ul>) : <div className="p-2">You do not have any notifications yet</div>}
                </div>
            </aside>

            <AnimatePresence>
                {isOpen ? (
                    <motion.div key="notifications-backdrop"
                        onClick={() => setIsOpen(false)}
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
