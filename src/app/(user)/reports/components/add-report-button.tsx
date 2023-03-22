'use client';

import * as Popover from '@radix-ui/react-popover';
import { useRouter } from 'next/navigation';
import { MouseEvent, startTransition, useState } from 'react';

import { getApiUrl } from '@/lib/api';

import Button from '../../../components/button';

async function createReportRelationship(emailAddress: string) {
    await fetch(getApiUrl('reports'), {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ reportEmail: emailAddress })
    });
}

export default function AddReportButton() {
    const [email, setEmail] = useState<string>();
    const [isPopoverOpen, setIsPopoverOpen] = useState(false);
    const router = useRouter();
    async function onSubmit(event: MouseEvent<HTMLButtonElement>) {
        event.preventDefault();
        if (email) {
            await createReportRelationship(email);
            setIsPopoverOpen(false);
            setEmail('');
            startTransition(() => {
                router.refresh();
            });
        }
    }

    return (
        <Popover.Root open={isPopoverOpen}>
            <Popover.Trigger asChild>
                <div className="my-10"><Button onClick={() => setIsPopoverOpen(true)} aria-label="Add report">Add Report</Button></div>
            </Popover.Trigger>
            <Popover.Portal>
                <Popover.Content className="rounded py-10 px-3 w-[460px] bg-zinc-800 text-zinc-400 border border-solid border-zinc-600 relative"
                    sideOffset={5}
                >
                    <div className="font-bold">Add Report</div>
                    <div className="flex justify-center items-center gap-2 mt-5">
                        <input id="email"
                            value={email}
                            onChange={(event) => setEmail(event.target.value)}
                            placeholder="email"
                            className="w-full h-8 inline-flex items-center justify-centerrounded px-2.5 leading-none outline-none"
                        />
                        <Button type="submit" disabled={!email} onClick={onSubmit} aria-label="Add report">Add</Button>
                    </div>
                    <Popover.Close className="inline-flex items-center text-sm justify-center absolute top-[5px] right-[10px] bg-zinc-900 rounded-lg px-2 py-1"
                        aria-label="Close"
                        onClick={() => setIsPopoverOpen(false)}
                    >
                    close
                    </Popover.Close>
                </Popover.Content>
            </Popover.Portal>
        </Popover.Root>
    );
}
