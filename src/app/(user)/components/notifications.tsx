'use client';

import { useEffect } from 'react';

import useDesktopNotification, { NotificationPermission } from '@/lib/hooks/useDesktopNotification';

export default function NotificationsPermission() {
    const { permission, requestPermission } = useDesktopNotification();

    useEffect(() => {
        if (permission !== NotificationPermission.Granted) {
            requestPermission().then();
        }
    }, [permission, requestPermission]);

    // eslint-disable-next-line react/jsx-no-useless-fragment
    return (<></>);
}
