'use client';

import { Commitment as CommitmentModel } from '@prisma/client';
import { MouseEvent, useState } from 'react';
import { useZact } from 'zact/client';

import Button from '@/app/components/ui/button/button';
import { useCloseUiComponent } from '@/app/components/ui/hooks/useCloseUiComponent';
import Input from '@/app/components/ui/input/input';
import Modal from '@/app/components/ui/modal/modal';
import modalStyles from '@/app/components/ui/modal/modal.module.css';
import { updateCommitmentAction } from '@/lib/commitments/update';
import { dateInputToISOString, formatDate } from '@/lib/date/format';

import CommitmentEntry from './commitment-entry';

type Commitment = Pick<CommitmentModel, 'id' | 'status' | 'title'> & { doneBy: string };
interface Props {
    commitment: Commitment;
}

export default function CommitmentCard({ commitment: originalCommitment }: Props) {
    const [commitment, setCommitment] = useState(originalCommitment);
    const [editCommitment, setEditCommitment] = useState({ ...commitment, doneBy: formatDate(originalCommitment.doneBy) });
    const [isClosed, closeModal] = useCloseUiComponent();

    const { mutate: updateCommitment } = useZact(updateCommitmentAction);

    const onSubmit = async (event: MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
        if (editCommitment.title && editCommitment.doneBy) {
            const updatedCommitment = {
                ...editCommitment,
                title: editCommitment.title,
                doneBy: dateInputToISOString(editCommitment.doneBy)!
            };
            setCommitment(updatedCommitment);
            await updateCommitment(updatedCommitment);
            closeModal();
        }
    };

    return (
        <Modal title="Edit commitment"
            close={isClosed}
            openComponent={<CommitmentEntry commitment={commitment} />}
        >
            <div className={modalStyles['modal-content']}>
                <div className="mb-4 flex items-center">
                    <span className="w-16">I will</span>
                    <Input value={editCommitment.title}
                        autoFocus
                        onChange={(event) => setEditCommitment({ ...editCommitment, title: event.target.value })}
                        placeholder="e.g. do this task"
                    />
                </div>
                <div className="mb-4 flex items-center">
                    <span className="w-16">by</span>
                    <Input type="date"
                        value={editCommitment.doneBy}
                        onChange={(event) => setEditCommitment({ ...editCommitment, doneBy: event.target.value })}
                        placeholder="done by"
                    />
                </div>
            </div>
            <div className={modalStyles['modal-actions']}>
                <Button label="Save"
                    intent="cta"
                    disabled={!editCommitment.title || !editCommitment.doneBy}
                    onClick={onSubmit}
                />
            </div>
        </Modal>
    );
}
