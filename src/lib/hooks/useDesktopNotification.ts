import { useCallback, useState } from 'react';

import { createDesktopNotification, isDesktopNotificationGranted, isDesktopNotificationSupported, requestDesktopNotificationPermission } from '../notifications/desktop';

export default function useDesktopNotification() {
    const [{ permission, loading }, setState] = useState({
        permission: isDesktopNotificationSupported(),
        loading: false
    });

    const requestPermission = useCallback(async () => {
        if (isDesktopNotificationSupported() && !isDesktopNotificationGranted()) {
            setState((previous) => ({ ...previous, loading: true }));
            const requestedPermissionResult = await requestDesktopNotificationPermission();
            setState((previous) => ({ ...previous, loading: false, permission: requestedPermissionResult }));
        }
    }, []);

    const trigger = useCallback(({ title, options = {} }: {
        title: string,
        options?: NotificationOptions
    }) => {
        createDesktopNotification({ title, options });
    }, [permission]);

    return { permission, loading, requestPermission, trigger };
}
