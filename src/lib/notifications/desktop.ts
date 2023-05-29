export enum NotificationPermission {
    Granted = 'granted',
    Denied = 'denied',
    Default = 'default'
}

export function isDesktopNotificationSupported() {
    return 'Notification' in window && 'serviceWorker' in navigator && 'PushManager' in window;
}

export function isDesktopNotificationGranted() {
    if (!isDesktopNotificationSupported()) {
        return false;
    }

    return Notification.permission === NotificationPermission.Granted;
}

export async function requestDesktopNotificationPermission() {
    if (!isDesktopNotificationSupported()) {
        return NotificationPermission.Denied;
    }

    return Notification.requestPermission();
}

export function createDesktopNotification({ title, options = {} }: {
    title: string,
    options?: NotificationOptions
}) {
    if (isDesktopNotificationGranted()) {
        new Notification(title, options);
    }
}

