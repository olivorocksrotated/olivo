import { useEffect } from 'react';

import useDesktopNotification, { NotificationPermission } from '@/lib/hooks/useDesktopNotification';

export default function useRequestDesktopPermission() {
    const { permission, requestPermission } = useDesktopNotification();

    useEffect(() => {
        if (permission !== NotificationPermission.Granted) {
            requestPermission();
        }
    }, [permission, requestPermission]);
}
