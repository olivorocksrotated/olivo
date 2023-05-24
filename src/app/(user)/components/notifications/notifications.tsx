'use client';

import clsx from 'clsx';
import { useEffect, useState } from 'react';
import { IoMdNotifications } from 'react-icons/io';

import useDesktopNotification, { NotificationPermission } from '@/lib/hooks/useDesktopNotification';

function useRequestDesktopPermission() {
    const { permission, requestPermission } = useDesktopNotification();

    useEffect(() => {
        if (permission !== NotificationPermission.Granted) {
            requestPermission();
        }
    }, [permission, requestPermission]);
}

export default function Notifications() {
    useRequestDesktopPermission();

    const [isOpen, setIsOpen] = useState(false);
    const asideStyle = clsx({
        'fixed right-0 top-0 z-40 h-screen w-56 translate-x-full transition-transform': true,
        'sm:w-96': true,
        '-translate-x-0': isOpen
    });
    const buttonStyle = clsx(
        'inline-flex items-center rounded-lg p-2 text-sm text-gray-400',
        'sm:absolute sm:right-0 sm:top-0 sm:mr-2 sm:mt-2',
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
                <div className="h-full overflow-y-auto px-3 py-4" style={{ background: 'rgb(22, 24, 29)' }}>
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

            {isOpen ? <div onClick={() => setIsOpen(false)} className="absolute left-0 top-0 h-screen w-screen bg-slate-900 opacity-60"></div> : null}
        </div>
    );
}
