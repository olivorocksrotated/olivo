'use client';

import { useRouter } from 'next/navigation';
import { MouseEvent, useState, useTransition } from 'react';

import Button from '@/app/components/button';
import PopoverButton from '@/app/components/popover-button';
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
        <PopoverButton onClose={() => setCommitment(nullCommitment)} label="Add commitment">
            <div className="font-bold">Add commitment</div>
            <div className="flex justify-center items-center gap-2 mt-5">
                <span className="w-16">I will</span>
                <input value={commitment.title}
                    onChange={(event) => setCommitment({ ...commitment, title: event.target.value })}
                    placeholder="e.g. do this task"
                    className="w-full h-8 inline-flex items-center justify-centerrounded px-2.5 leading-none outline-none"
                />
                <span>by</span>
                <input type="date"
                    value={commitment.doneBy}
                    onChange={(event) => setCommitment({ ...commitment, doneBy: event.target.value })}
                    placeholder="done by"
                    className="w-60 h-8 px-2.5"
                />
                <Button type="submit" disabled={!commitment.title || !commitment.doneBy} onClick={onSubmit} glowing={true} aria-label="Add commitment">
                    Add
                </Button>
            </div>
        </PopoverButton>
    );
}

