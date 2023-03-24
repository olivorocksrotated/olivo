'use client';

import * as Popover from '@radix-ui/react-popover';
import { useRouter } from 'next/navigation';
import { MouseEvent, startTransition, useState } from 'react';

import Button from '@/app/components/button';
import { getApiUrl } from '@/lib/api';

async function createCommitment(commitment: { title: string, doneBy: Date }) {
    await fetch(getApiUrl('commitments'), {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(commitment)
    });
}

export default function AddCommitmentButton() {
    const nullCommitment = { title: '', doneBy: new Date() };
    const [commitment, setCommitment] = useState(nullCommitment);
    const [isPopoverOpen, setIsPopoverOpen] = useState(false);
    const router = useRouter();
    async function onSubmit(event: MouseEvent<HTMLButtonElement>) {
        event.preventDefault();
        if (commitment.title) {
            await createCommitment(commitment);
            setIsPopoverOpen(false);
            setCommitment(nullCommitment);
            startTransition(() => router.refresh());
        }
    }

    return (
        <Popover.Root open={isPopoverOpen}>
            <Popover.Trigger asChild>
                <div className="my-10"><Button onClick={() => setIsPopoverOpen(true)} aria-label="Add commitment">Add commitment</Button></div>
            </Popover.Trigger>
            <Popover.Portal>
                <Popover.Content className="rounded py-10 px-3 w-[460px] bg-zinc-800 text-zinc-400 border border-solid border-zinc-600 relative"
                    sideOffset={5}
                >
                    <div className="font-bold">Add commitment</div>
                    <div className="flex justify-center items-center gap-2 mt-5">
                        <input id="title"
                            value={commitment.title}
                            onChange={(event) => setCommitment({ ...commitment, title: event.target.value })}
                            placeholder="title"
                            className="w-full h-8 inline-flex items-center justify-centerrounded px-2.5 leading-none outline-none"
                        />
                        <Button type="submit" disabled={!commitment.title} onClick={onSubmit} aria-label="Add commitment">Add</Button>
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

