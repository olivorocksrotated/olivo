export enum NotificationPermission {
    Granted = 'granted',
    Denied = 'denied',
    Default = 'default'
}

export function isDesktopNotificationSupported() {
    return typeof Notification !== 'undefined' && Notification.permission;
}

export function isDesktopNotificationGranted() {
    return Notification.permission === NotificationPermission.Granted;
}

export function isAbleToReceiveDesktopNotification() {
    return isDesktopNotificationSupported() && isDesktopNotificationGranted();
}

export function requestDesktopNotificationPermission() {
    return Notification.requestPermission();
}

export function createDesktopNotification({ title, options = {} }: {
    title: string,
    options?: NotificationOptions
}) {
    if (isAbleToReceiveDesktopNotification()) {
        new Notification(title, options);
    }
}

