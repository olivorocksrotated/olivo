import { toast, ToastContent, ToastOptions } from 'react-toastify';

export function createBrowserNotification({ content, options = {} }: { content: ToastContent, options?: ToastOptions }) {
    toast(content, options);
}
