'use client';

import * as Popover from '@radix-ui/react-popover';
import clsx from 'clsx';
import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { IoMdNotifications } from 'react-icons/io';

import useDesktopNotification, { NotificationPermission } from '@/lib/hooks/useDesktopNotification';

function useRequestDesktopPermission() {
    const { permission, requestPermission } = useDesktopNotification();

    useEffect(() => {
        if (permission !== NotificationPermission.Granted) {
            requestPermission().then();
        }
    }, [permission, requestPermission]);
}

export default function Notifications() {
    useRequestDesktopPermission();

    const [isOpen, setIsOpen] = useState(false);
    const buttonStyle = clsx({
        'cursor-pointer rounded border border-slate-500 p-2 text-gray-400 transition': true,
        'hover:bg-slate-700 hover:text-white': true,
        'bg-slate-700 text-white': isOpen
    });

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
            <Popover.Root onOpenChange={(isOpenValue) => setIsOpen(isOpenValue)}>
                <Popover.Trigger>
                    <div className={buttonStyle}><IoMdNotifications size={20} /></div>
                </Popover.Trigger>
                <Popover.Anchor />
                <Popover.Portal>
                    <Popover.Content align="end">
                        <motion.div className="min-w-full rounded bg-slate-700 p-2 text-white sm:w-96"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.2 }}
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
                        </motion.div>
                    </Popover.Content>
                </Popover.Portal>
            </Popover.Root>
        </div>
    );
}
