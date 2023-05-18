'use client';

import { clsx } from 'clsx';
import { useRouter } from 'next/navigation';
import { MouseEvent, startTransition, useState } from 'react';

import Button from '@/app/components/button';
import DialogButton from '@/app/components/dialog-button';
import { fetchFromApi, ResourcePath } from '@/lib/http/fetch';
import { HttpMethod } from '@/lib/http/route';

function createReportRelationship(emailAddress: string) {
    return fetchFromApi({
        method: HttpMethod.POST,
        path: ResourcePath.Reports,
        body: { reportEmail: emailAddress }
    });
}

export default function ConnectButton() {
    const [email, setEmail] = useState<string>();
    const [feedbackMessage, setFeedbackMessage] = useState<{ type: 'error' | 'success'; message: string }>();
    const [processing, setProcessing] = useState<boolean>();
    const router = useRouter();

    async function onSubmit(event: MouseEvent<HTMLButtonElement>) {
        event.preventDefault();
        if (email) {
            setProcessing(true);
            const response = await createReportRelationship(email);
            setProcessing(false);
            if (response.status >= 400) {
                const { message } = await response.json();

                return setFeedbackMessage({ type: 'error', message });
            }
            setFeedbackMessage({ type: 'success', message: 'Report added.' });

            setEmail('');

            startTransition(() => {
                router.refresh();
            });
        }
    }

    function reset() {
        setEmail('');
        setFeedbackMessage(undefined);
        setProcessing(false);
    }

    return (
        <DialogButton onClose={reset}
            onSubmit={onSubmit}
            dialog={{
                title: 'Add the email of the user you would like to connect with',
                actionLabel: 'Connect',
                actionDisabled: !email || processing
            }}
            openButton={<Button>Connect</Button>}
        >
            <div className="relative">
                <div className="">
                    <input id="email"
                        value={email}
                        onChange={(event) => setEmail(event.target.value)}
                        placeholder="email"
                        className="inline-flex h-8 w-full items-center justify-center rounded px-2.5 leading-none outline-none"
                    />
                </div>
                <div className={clsx(
                    'flex h-12 items-center',
                    { 'text-red-300': feedbackMessage?.type === 'error' },
                    { 'text-green-300': feedbackMessage?.type === 'success' }
                )}
                >
                    {feedbackMessage?.message}
                </div>
            </div>
        </DialogButton>
    );
}
