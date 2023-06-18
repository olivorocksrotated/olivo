'use client';

import Link from 'next/link';
import { MouseEvent, useState } from 'react';
import { IoAddOutline } from 'react-icons/io5';
import { useZact } from 'zact/client';

import Button from '@/app/components/ui/button/button';
import { useCloseUiComponent } from '@/app/components/ui/hooks/useCloseUiComponent';
import IconButton from '@/app/components/ui/icon-button/icon-button';
import Input from '@/app/components/ui/input/input';
import Modal from '@/app/components/ui/modal/modal';
import modalStyles from '@/app/components/ui/modal/modal.module.css';
import { createCommitmentAction } from '@/lib/commitments/create';
import { dateInputToISOString, formatDate } from '@/lib/date/format';

export default function AddCommitmentButton() {
    const nullCommitment = { title: '', doneBy: formatDate(new Date(), 'yyyy-MM-dd') };
    const [commitment, setCommitment] = useState(nullCommitment);
    const [isClosed, closeModal] = useCloseUiComponent();

    const { mutate: createCommitment } = useZact(createCommitmentAction);

    const onSubmit = async (event: MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
        if (commitment.title && commitment.doneBy) {
            await createCommitment({ ...commitment, doneBy: dateInputToISOString(commitment.doneBy)! });
            closeModal();
            setCommitment(nullCommitment);
        }
    };

    return (
        <Modal title="Add commitment"
            close={isClosed}
            onClose={() => setCommitment(nullCommitment)}
            openComponent={<IconButton icon={IoAddOutline} label="Add commitment" size="s" />}
        >
            <div className={modalStyles['modal-content']}>
                <div className="mb-4 flex items-center">
                    <span className="w-16">I will</span>
                    <Input value={commitment.title}
                        autoFocus
                        onChange={(event) => setCommitment({ ...commitment, title: event.target.value })}
                        placeholder="e.g. do this task"
                    />
                </div>
                <div className="mb-4 flex items-center">
                    <span className="w-16">by</span>
                    <Input type="date"
                        value={commitment.doneBy}
                        onChange={(event) => setCommitment({ ...commitment, doneBy: event.target.value })}
                        placeholder="done by"
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

