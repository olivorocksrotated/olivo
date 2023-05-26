import { createBrowserNotification } from './browser';
import { createDesktopNotification } from './desktop';

const iconsMap = {
    success: '🎉',
    error: '❗',
    warning: '🛎️',
    info: 'ℹ️'
};

export function createBasicClientNotification({ title, description, destination, icon }: {
    title: string,
    description?: string
    destination: 'browser' | 'desktop'
    icon?: 'success' | 'error' | 'warning' | 'info'
}) {
    if (destination === 'browser') {
        return createBrowserNotification({
            content: title,
            options: { icon: icon ? iconsMap[icon] : undefined }
        });
    }

    if (destination === 'desktop') {
        return createDesktopNotification({
            title,
            options: {
                body: description,
                image: icon ? '/favicon.ico' : undefined,
                badge: icon ? '/favicon.ico' : undefined,
                icon: icon ? '/favicon.ico' : undefined
            }
        });
    }
}
