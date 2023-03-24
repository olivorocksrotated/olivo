'use client';

import { useRouter } from 'next/navigation';
import { MouseEvent, startTransition, useState } from 'react';

import PopoverButton from '@/app/components/popover-button';
import { getApiUrl } from '@/lib/api';

import Button from '../../../components/button';

async function createReportRelationship(emailAddress: string) {
    await fetch(getApiUrl('reports'), {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ reportEmail: emailAddress })
    });
}

function AddReport() {
    const [email, setEmail] = useState<string>();
    const [processing, setProcessing] = useState<boolean>();
    const router = useRouter();

    async function onSubmit(event: MouseEvent<HTMLButtonElement>) {
        event.preventDefault();
        if (email) {
            setProcessing(true);
            await createReportRelationship(email);
            setEmail('');
            setProcessing(false);
            startTransition(() => {
                router.refresh();
            });
        }
    }

    return (
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
        </div>
    );
}

export default function AddReportButton() {
    return (
        <PopoverButton label="Add Report">
            <AddReport></AddReport>
        </PopoverButton>
    );
}
