'use client';

import Link from 'next/link';
import { MouseEvent, useState } from 'react';
import { IoAddOutline } from 'react-icons/io5';
import { useZact } from 'zact/client';

import DialogButton from '@/app/components/dialog-button';
import { createCommitmentAction } from '@/lib/commitments/create';
import { formatDate } from '@/lib/date/format';

export default function AddCommitmentButton() {
    const nullCommitment = { title: '', doneBy: formatDate(new Date(), 'yyyy-MM-dd') };
    const [commitment, setCommitment] = useState(nullCommitment);

    const { mutate: createCommitment } = useZact(createCommitmentAction);

    async function onSubmit(event: MouseEvent<HTMLButtonElement>) {
        event.preventDefault();
        if (commitment.title && commitment.doneBy) {
            await createCommitment({ ...commitment, doneBy: new Date(commitment.doneBy).toISOString() });
            setCommitment(nullCommitment);
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
                <div className="mb-4">
                    <span className="text-slate-300">Find all your commitments</span>{' '}
                    <Link href="/commitments" className="text-white hover:text-indigo-300">in the &quot;Commitments&quot; section</Link>
                </div>
            </div>
        </DialogButton>
    );
}

