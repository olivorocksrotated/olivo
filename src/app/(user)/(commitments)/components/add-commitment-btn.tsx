'use client';

import { useRouter } from 'next/navigation';
import { MouseEvent, useState, useTransition } from 'react';
import { IoAddOutline } from 'react-icons/io5';

import DialogButton from '@/app/components/dialog-button';
import { formatDate } from '@/lib/date/format';
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
    const nullCommitment = { title: '', doneBy: formatDate(new Date(), 'yyyy-MM-dd') };
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
        <DialogButton onSubmit={onSubmit}
            onClose={() => setCommitment(nullCommitment)}
            dialog={{
                title: 'Add commitment',
                actionLabel: 'Add',
                actionDisabled: !commitment.title || !commitment.doneBy
            }}
            openButton={
                <button type="button" aria-label="Add commitment" className="rounded p-1 text-slate-400 transition hover:bg-slate-700 hover:text-slate-200">
                    <IoAddOutline size={20} />
                </button>
            }
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

