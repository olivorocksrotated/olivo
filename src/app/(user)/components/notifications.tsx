'use client';

import { useEffect } from 'react';

import useNotification, { NotificationPermission } from '@/lib/hooks/useNotification';

export default function Notifications() {
    const { permission, requestPermission } = useNotification();

    useEffect(() => {
        if (permission !== NotificationPermission.Granted) {
            requestPermission().then();
        }
    }, [permission, requestPermission]);

    // eslint-disable-next-line react/jsx-no-useless-fragment
    return (<></>);
}
