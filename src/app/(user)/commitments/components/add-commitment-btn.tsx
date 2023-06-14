'use client';

import Link from 'next/link';
import { MouseEvent, useState } from 'react';
import { IoAddOutline } from 'react-icons/io5';
import { useZact } from 'zact/client';

import Button from '@/app/components/ui/button/button';
import IconButton from '@/app/components/ui/icon-button/icon-button';
import Modal, { setModalClosed } from '@/app/components/ui/modal/modal';
import modalStyles from '@/app/components/ui/modal/modal.module.css';
import { createCommitmentAction } from '@/lib/commitments/create';
import { dateInputToISOString, formatDate } from '@/lib/date/format';

export default function AddCommitmentButton() {
    const nullCommitment = { title: '', doneBy: formatDate(new Date(), 'yyyy-MM-dd') };
    const [commitment, setCommitment] = useState(nullCommitment);
    const [closeAddModal, setCloseAddModal] = useState(false);

    const { mutate: createCommitment } = useZact(createCommitmentAction);

    const onSubmit = async (event: MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
        if (commitment.title && commitment.doneBy) {
            await createCommitment({ ...commitment, doneBy: dateInputToISOString(commitment.doneBy)! });
            setModalClosed(setCloseAddModal);
            setCommitment(nullCommitment);
        }
    };

    return (
        <Modal title="Add commitment"
            close={closeAddModal}
            onClose={() => setCommitment(nullCommitment)}
            openComponent={<IconButton icon={IoAddOutline} label="Add commitment" />}
        >
            <div className={modalStyles['modal-content']}>
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
            <div className={modalStyles['modal-actions']}>
                <Button label="Add commitment"
                    intent="cta"
                    disabled={!commitment.title || !commitment.doneBy}
                    onClick={onSubmit}
                />
            </div>
        </Modal>
    );
}

