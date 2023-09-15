import { describe, expect, it, vi } from 'vitest';

import { createBrowserNotification } from './browser';
import { createBasicClientNotification } from './create';
import { createDesktopNotification } from './desktop';

vi.mock('./browser', () => ({
    createBrowserNotification: vi.fn()
}));

vi.mock('./desktop', () => ({
    createDesktopNotification: vi.fn()
}));

describe('lib notifications', () => {
    describe('create', () => {
        describe('createBasicClientNotification', () => {
            describe('browser', () => {
                it('should create a notification with the right arguments', () => {
                    createBasicClientNotification({
                        title: 'hello',
                        destination: 'browser',
                        type: 'success'
                    });

                    expect(createBrowserNotification).toHaveBeenCalledWith({
                        content: 'hello',
                        options: { icon: '🎉', type: 'success' }
                    });
                });
            });

            describe('desktop', () => {
                it('should create a notification with the right arguments', () => {
                    createBasicClientNotification({
                        title: 'hello',
                        description: 'desc',
                        destination: 'desktop',
                        type: 'success'
                    });

                    expect(createDesktopNotification).toHaveBeenCalledWith({
                        title: 'hello',
                        options: {
                            body: 'desc',
                            image: '/favicon.ico',
                            badge: '/favicon.ico',
                            icon: '/favicon.ico'
                        }
                    });
                });
            });
        });
    });
});
