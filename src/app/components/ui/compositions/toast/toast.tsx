'use client';

import { createBasicClientNotification } from '@/lib/notifications/create';

import ToastContainer from '../../../toast-container';
import Button from '../../button/button';

export default function Toast() {
    return (
        <>
            <ToastContainer />
            <div className="flex gap-5">
                <Button
                    label="Open success toast"
                    onClick={() => createBasicClientNotification({
                        title: 'Success',
                        destination: 'browser',
                        type: 'success'
                    })}
                />

                <Button
                    label="Open info toast"
                    onClick={() => createBasicClientNotification({
                        title: 'Info',
                        destination: 'browser',
                        type: 'info'
                    })}
                />

                <Button
                    label="Open warning toast"
                    onClick={() => createBasicClientNotification({
                        title: 'Warning',
                        destination: 'browser',
                        type: 'warning'
                    })}
                />

                <Button
                    label="Open error toast"
                    onClick={() => createBasicClientNotification({
                        title: 'Error',
                        destination: 'browser',
                        type: 'error'
                    })}
                />
            </div>
        </>
    );
}
