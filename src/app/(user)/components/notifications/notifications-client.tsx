'use client';

import { Commitment } from '@prisma/client';
import clsx from 'clsx';
import { AnimatePresence, motion } from 'framer-motion';
import { useState } from 'react';
import { IoMdNotifications } from 'react-icons/io';

import useRequestDesktopPermission from './hooks/useRequestDesktopPermission';
import useScheduleNotifications from './hooks/useScheduleNotifications';

interface Props {
    commitments: Pick<Commitment, 'doneBy'>[]
}

export default function NotificationsClient({ commitments }: Props) {
    useRequestDesktopPermission();
    useScheduleNotifications({ commitments });

    const [isOpen, setIsOpen] = useState(false);
    const asideStyle = clsx(
        'fixed right-0 top-0 z-40 h-screen w-56 transition-transform',
        'sm:w-96',
        { 'translate-x-full': !isOpen },
        { '-translate-x-0': isOpen }
    );
    const buttonStyle = clsx(
        'inline-flex items-center rounded-lg p-2 text-sm text-gray-400',
        'sm:absolute sm:right-0 sm:top-0 sm:mr-6 sm:mt-6',
        'hover:bg-gray-700',
        'focus:outline-none focus:ring-2 focus:ring-gray-600'
    );

    const listItem = ({ title, body }: { title: string, body: string }) => (
        <li role="listitem" className="p-3 sm:p-4">
            <div>
                <div className="mb-2 font-medium">{title}</div>
                <div className="text-sm">{body}</div>
            </div>
        </li>
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
                <IoMdNotifications size={25} />
            </button>

            <aside id="notifications" className={asideStyle} aria-label="Notifications">
                <div className="h-full overflow-y-auto px-3 py-4"
                    style={{
                        background: 'rgb(35, 37, 38)',
                        border: '1px solid hsla(0,0%,100%,.05)'
                    }}
                >
                    <ul role="list" className="divide-y divide-gray-600">
                        {listItem({
                            title: 'Example notification',
                            body: 'This is the content of it, a bit longer than the other one and blablabla'
                        })}
                        {listItem({
                            title: 'Another notification',
                            body: 'This is the content of it, a bit longer than the other one and blablabla'
                        })}
                    </ul>
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