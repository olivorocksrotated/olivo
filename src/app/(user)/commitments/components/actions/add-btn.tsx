'use client';

import { JSONContent } from '@tiptap/react';
import Link from 'next/link';
import { useState } from 'react';
import { IoAddOutline } from 'react-icons/io5';
import { useZact } from 'zact/client';

import Button from '@/app/components/ui/button/button';
import { useCloseUiComponent } from '@/app/components/ui/hooks/useCloseUiComponent';
import Input from '@/app/components/ui/input/input';
import Modal from '@/app/components/ui/modal/modal';
import ModalContent from '@/app/components/ui/modal/modal-content';
import ModalFooter from '@/app/components/ui/modal/modal-footer';
import RichTextEditor from '@/app/components/ui/rich-text-editor/rich-text-editor';
import { createCommitmentAction } from '@/lib/commitments/create';
import { dateInputToISOString, formatDate } from '@/lib/date/format';
import onEnterPressed from '@/lib/keys/enter';

export default function AddButton() {
    const nullCommitment = { title: '', doneBy: formatDate(new Date(), 'yyyy-MM-dd'), description: {} as JSONContent };
    const [commitment, setCommitment] = useState(nullCommitment);
    const [isClosed, closeModal] = useCloseUiComponent();

    const { mutate: createCommitment } = useZact(createCommitmentAction);

    const onSave = async () => {
        if (!commitment.title || !commitment.doneBy) {
            return;
        }

        await createCommitment({
            ...commitment,
            doneBy: dateInputToISOString(commitment.doneBy)!,
            description: undefined
        });
        closeModal();
        setCommitment(nullCommitment);
    };

    const openComponent = (
        <li title="Add commitment" className="cursor-pointer rounded-lg border border-dashed border-neutral-500 p-1 text-neutral-500 transition hover:border-neutral-400 hover:text-neutral-400">
            <IoAddOutline size={25} className="mx-auto my-0" />
        </li>
    );

    return (
        <Modal title="Add commitment" close={isClosed} openComponent={openComponent}>
            <ModalContent>
                <div className="mb-4 flex items-center">
                    <label className="w-16">I will</label>
                    <Input value={commitment.title}
                        autoFocus
                        onChange={(event) => setCommitment({ ...commitment, title: event.target.value })}
                        onKeyUp={onEnterPressed(onSave)}
                        placeholder="e.g. do this task"
                    />
                </div>
                <div className="mb-6 flex items-center">
                    <label className="w-16">by</label>
                    <Input type="date"
                        value={commitment.doneBy}
                        onChange={(event) => setCommitment({ ...commitment, doneBy: event.target.value })}
                        onKeyUp={onEnterPressed(onSave)}
                        placeholder="done by"
                    />
                </div>
                <div className="mb-4 w-full border-t border-neutral-600"></div>
                <div className="mb-4">
                    <div className="mb-2"><label>Description</label></div>
                    <RichTextEditor height="s" onChange={(description) => setCommitment({ ...commitment, description })} />
                </div>
                <div className="mb-4">
                    <span className="text-slate-300">Find all your commitments</span>{' '}
                    <Link href="/commitments" className="text-white hover:text-indigo-300">in the &quot;Commitments&quot; section</Link>
                </div>
            </ModalContent>
            <ModalFooter>
                <Button label="Add commitment"
                    intent="cta"
                    disabled={!commitment.title || !commitment.doneBy}
                    onClick={onSave}
                />
            </ModalFooter>
        </Modal>
    );
}

