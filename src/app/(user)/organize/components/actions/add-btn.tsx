'use client';

import { JSONContent } from '@tiptap/react';
import { useAction } from 'next-safe-action/hooks';
import { useState } from 'react';

import Button from '@/app/components/ui/button/button';
import { useCloseUiComponent } from '@/app/components/ui/hooks/useCloseUiComponent';
import Input from '@/app/components/ui/input/input';
import ListAddButton from '@/app/components/ui/list-add-button/list-add-button';
import Modal from '@/app/components/ui/modal/modal';
import ModalContent from '@/app/components/ui/modal/modal-content';
import ModalFooter from '@/app/components/ui/modal/modal-footer';
import RichTextEditor from '@/app/components/ui/rich-text-editor/rich-text-editor';
import TextLink from '@/app/components/ui/text-link/text-link';
import type { createCommitmentAction } from '@/lib/commitments/create';
import { dateInputToISOString, formatDate } from '@/lib/date/format';
import onEnterPressed from '@/lib/keys/enter';

export interface Props {
    createCommitmentAction: typeof createCommitmentAction
}

export default function AddButton({ createCommitmentAction }: Props) {
    const nullCommitment = { title: '', doneBy: formatDate(new Date(), 'yyyy-MM-dd'), description: {} as JSONContent };
    const [commitment, setCommitment] = useState(nullCommitment);
    const [isClosed, closeModal] = useCloseUiComponent();

    const { execute: createCommitment } = useAction(createCommitmentAction);

    const onSave = async () => {
        if (!commitment.title || !commitment.doneBy) {
            return;
        }

        await createCommitment({
            ...commitment,
            doneBy: dateInputToISOString(commitment.doneBy)!,
            description: JSON.stringify(commitment.description)
        });
        closeModal();
        setCommitment(nullCommitment);
    };

    const openComponent = <ListAddButton label="Add commitment" size="s" />;

    return (
        <Modal title="Add commitment" close={isClosed} openComponent={openComponent}>
            <ModalContent>
                <div className="mb-4 flex items-center">
                    <label className="w-12">I will</label>
                    <div className="grow">
                        <Input
                            value={commitment.title}
                            autoFocus
                            onChange={(event) => setCommitment({ ...commitment, title: event.target.value })}
                            onKeyUp={onEnterPressed(onSave)}
                            placeholder="e.g. do this task"
                        />
                    </div>
                </div>
                <div className="mb-6 flex items-center">
                    <label className="w-12">by</label>
                    <div className="grow">
                        <Input
                            type="date"
                            value={commitment.doneBy}
                            onChange={(event) => setCommitment({ ...commitment, doneBy: event.target.value })}
                            onKeyUp={onEnterPressed(onSave)}
                            placeholder="done by"
                        />
                    </div>
                </div>
                <div className="mb-4 w-full border-t border-neutral-600"></div>
                <div className="mb-4">
                    <div className="mb-2"><label>Description</label></div>
                    <RichTextEditor height="s" onChange={(description) => setCommitment({ ...commitment, description })} />
                </div>
                <div className="mb-4">
                    <span className="text-slate-300">Find all your commitments</span>{' '}
                    <TextLink href="/commitments">in the &quot;Commitments&quot; section</TextLink>
                </div>
            </ModalContent>
            <ModalFooter>
                <Button
                    label="Add commitment"
                    intent="cta"
                    disabled={!commitment.title || !commitment.doneBy}
                    onClick={onSave}
                />
            </ModalFooter>
        </Modal>
    );
}

