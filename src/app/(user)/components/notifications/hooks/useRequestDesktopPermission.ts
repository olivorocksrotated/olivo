import { useEffect } from 'react';

import { requestDesktopNotificationPermission } from '@/lib/notifications/desktop';

export default function useRequestDesktopPermission() {
    useEffect(() => {
        requestDesktopNotificationPermission();
    }, []);
}
