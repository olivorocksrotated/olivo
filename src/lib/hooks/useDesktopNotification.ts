import { useCallback, useState } from 'react';

export enum NotificationPermission {
    Granted = 'granted',
    Denied = 'denied',
    Default = 'default'
}

const isNotificationSupported = () => typeof Notification !== 'undefined' && Notification.permission;

export default function useDesktopNotification() {
    const [{ permission, loading }, setState] = useState({
        permission: isNotificationSupported(),
        loading: false
    });

    const requestPermission = useCallback(async () => {
        if (isNotificationSupported() && Notification.permission !== NotificationPermission.Granted) {
            setState((previous) => ({ ...previous, loading: true }));
            const requestedPermissionResult = await Notification.requestPermission();
            setState((previous) => ({ ...previous, loading: false, permission: requestedPermissionResult }));
        }
    }, []);

    const trigger = useCallback(({ title, options = {} }: {
        title: string,
        options?: NotificationOptions
    }) => {
        if (isNotificationSupported() && permission === NotificationPermission.Granted) {
            new Notification(title, options);
        }
    }, [permission]);

    return { permission, loading, requestPermission, trigger };
}
