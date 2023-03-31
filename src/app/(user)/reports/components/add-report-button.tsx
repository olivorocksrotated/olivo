'use client';

import { clsx } from 'clsx';
import { useRouter } from 'next/navigation';
import { MouseEvent, startTransition, useState } from 'react';

import PopoverButton from '@/app/components/popover-button';
import { fetchFromApi, ResourcePath } from '@/lib/http/fetch';
import { HttpMethod } from '@/lib/http/route';

import Button from '../../../components/button';

function createReportRelationship(emailAddress: string) {
    return fetchFromApi({
        method: HttpMethod.POST,
        path: ResourcePath.Reports,
        body: { reportEmail: emailAddress }
    });
}

export default function AddReportButton() {
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
        <PopoverButton onClose={reset} label="Add Report">
            <div className="relative">
                <div className="font-bold">Add Report</div>
                <div className="flex justify-center items-center gap-2 mt-5">
                    <input id="email"
                        value={email}
                        onChange={(event) => setEmail(event.target.value)}
                        placeholder="email"
                        className="w-full h-8 inline-flex items-center justify-center rounded px-2.5 leading-none outline-none"
                    />
                    <Button type="submit" disabled={!email || processing} onClick={onSubmit} aria-label="Add report">Add</Button>
                </div>
                <div className={clsx(
                    'h-12 flex items-center',
                    { 'text-red-300': feedbackMessage?.type === 'error' },
                    { 'text-green-300': feedbackMessage?.type === 'success' }
                )}
                >
                    {feedbackMessage?.message}
                </div>
            </div>
        </PopoverButton>
    );
}
