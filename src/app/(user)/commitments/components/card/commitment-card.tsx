'use client';

import { useEffect, useState } from 'react';
import { useZact } from 'zact/client';

import Button from '@/app/components/ui/button/button';
import { useCloseUiComponent } from '@/app/components/ui/hooks/useCloseUiComponent';
import Input from '@/app/components/ui/input/input';
import Modal from '@/app/components/ui/modal/modal';
import ModalContent from '@/app/components/ui/modal/modal-content';
import ModalFooter from '@/app/components/ui/modal/modal-footer';
import RichTextEditor from '@/app/components/ui/rich-text-editor/rich-text-editor';
import { updateCommitmentAction } from '@/lib/commitments/update';
import { dateInputToISOString, formatDate } from '@/lib/date/format';
import onEnterPressed from '@/lib/keys/enter';

import { ClientCommitment } from '../../types';
import CommitmentEntry from './commitment-entry';

interface Props {
    commitment: ClientCommitment;
}

export default function CommitmentCard({ commitment: originalCommitment }: Props) {
    const [commitment, setCommitment] = useState(originalCommitment);
    useEffect(() => {
        setCommitment(originalCommitment);
    }, [originalCommitment]);

    const [editCommitment, setEditCommitment] = useState({
        ...commitment,
        doneBy: formatDate(originalCommitment.doneBy),
        description: JSON.parse(originalCommitment.description ?? '{}') as object
    });
    const [isClosed, closeModal] = useCloseUiComponent();

    const { mutate: updateCommitment } = useZact(updateCommitmentAction);

    const onSave = async () => {
        if (!editCommitment.title || !editCommitment.doneBy) {
            return;
        }

        await updateCommitment({
            ...editCommitment,
            title: editCommitment.title,
            doneBy: dateInputToISOString(editCommitment.doneBy)!,
            description: JSON.stringify(editCommitment.description)
        });
        closeModal();
    };

    return (
        <Modal title="Edit commitment"
            close={isClosed}
            openComponent={<CommitmentEntry commitment={commitment} />}
        >
            <ModalContent>
                <div className="mb-4 flex items-center">
                    <span className="w-16">I will</span>
                    <Input value={editCommitment.title}
                        autoFocus
                        onChange={(event) => setEditCommitment({ ...editCommitment, title: event.target.value })}
                        onKeyUp={onEnterPressed(onSave)}
                        placeholder="e.g. do this task"
                    />
                </div>
                <div className="mb-4 flex items-center">
                    <span className="w-16">by</span>
                    <Input type="date"
                        value={editCommitment.doneBy}
                        onChange={(event) => setEditCommitment({ ...editCommitment, doneBy: event.target.value })}
                        onKeyUp={onEnterPressed(onSave)}
                        placeholder="done by"
                    />
                </div>
                <div className="mb-4 w-full border-t border-neutral-600"></div>
                <div className="mb-4">
                    <div className="mb-2"><label>Description</label></div>
                    <RichTextEditor value={editCommitment.description} height="s" onChange={(description) => setEditCommitment({ ...editCommitment, description })} />
                </div>
            </ModalContent>
            <ModalFooter>
                <Button label="Save"
                    intent="cta"
                    disabled={!editCommitment.title || !editCommitment.doneBy}
                    onClick={onSave}
                />
            </ModalFooter>
        </Modal>
    );
}
