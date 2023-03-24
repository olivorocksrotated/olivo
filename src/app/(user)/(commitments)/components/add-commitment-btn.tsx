'use client';

import { useRouter } from 'next/navigation';
import { MouseEvent, startTransition, useState } from 'react';

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
    const nullCommitment = { title: '', doneBy: new Date() };
    const [commitment, setCommitment] = useState(nullCommitment);
    const router = useRouter();
    async function onSubmit(event: MouseEvent<HTMLButtonElement>) {
        event.preventDefault();
        if (commitment.title) {
            await createCommitment(commitment);
            setCommitment(nullCommitment);
            startTransition(() => router.refresh());
        }
    }

    return (
        <PopoverButton onClose={() => setCommitment(nullCommitment)} label="Add commitment">
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
        </PopoverButton>
    );
}

