import { useEffect } from 'react';

import { isDesktopNotificationGranted, requestDesktopNotificationPermission } from '@/lib/notifications/desktop';

export default function useRequestDesktopPermission() {
    useEffect(() => {
        if (!isDesktopNotificationGranted()) {
            requestDesktopNotificationPermission();
        }
    }, []);
}
