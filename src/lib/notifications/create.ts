import { createBrowserNotification } from './browser';
import { createDesktopNotification } from './desktop';

const iconsMap = {
    success: '🎉',
    error: '❗',
    warning: '🛎️',
    info: 'ℹ️'
};

export function createBasicClientNotification({ title, description, destination, type = 'info' }: {
    title: string,
    description?: string
    destination: 'browser' | 'desktop'
    type?: 'success' | 'error' | 'warning' | 'info'
}): void {
    if (destination === 'browser') {
        return createBrowserNotification({
            content: title,
            options: { icon: iconsMap[type], type }
        });
    }

    if (destination === 'desktop') {
        return createDesktopNotification({
            title,
            options: {
                body: description,
                image: type ? '/favicon.ico' : undefined,
                badge: type ? '/favicon.ico' : undefined,
                icon: type ? '/favicon.ico' : undefined
            }
        });
    }
}
