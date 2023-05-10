'use client';

import { useRouter } from 'next/navigation';
import { MouseEvent, useState, useTransition } from 'react';

import DialogButton from '@/app/components/dialog-button';
import { fetchFromApi, ResourcePath } from '@/lib/http/fetch';
import { HttpMethod } from '@/lib/http/route';

async function createCommitment(commitment: { title: string, doneBy: Date }) {
    await fetchFromApi({
        method: HttpMethod.POST,
        path: ResourcePath.Commitments,
        body: commitment
    });
}

export default function AddCommitmentButton() {
    const nullCommitment = { title: '', doneBy: '' };
    const [commitment, setCommitment] = useState(nullCommitment);
    const router = useRouter();
    const [, startTransition] = useTransition();

    async function onSubmit(event: MouseEvent<HTMLButtonElement>) {
        event.preventDefault();
        if (commitment.title && commitment.doneBy) {
            await createCommitment({ ...commitment, doneBy: new Date(commitment.doneBy) });
            setCommitment(nullCommitment);
            startTransition(() => router.refresh());
        }
    }

    return (
        <DialogButton label="Add commitment"
            actionDisabled={!commitment.title || !commitment.doneBy}
            onClose={() => setCommitment(nullCommitment)}
            onSubmit={onSubmit}
        >
            <div>
                <div className="mb-4 flex items-center">
                    <span className="w-16">I will</span>
                    <input value={commitment.title}
                        autoFocus
                        onChange={(event) => setCommitment({ ...commitment, title: event.target.value })}
                        placeholder="e.g. do this task"
                        className="inline-flex h-8 w-full items-center justify-center rounded px-2.5 leading-none outline-none"
                    />
                </div>
                <div className="mb-4 flex items-center">
                    <span className="w-16">by</span>
                    <input type="date"
                        value={commitment.doneBy}
                        onChange={(event) => setCommitment({ ...commitment, doneBy: event.target.value })}
                        placeholder="done by"
                        className="h-8 w-full px-2.5"
                    />
                </div>
            </div>
        </DialogButton>
    );
}

