'use client';

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
import { createCommitmentAction } from '@/lib/commitments/create';
import { dateInputToISOString, formatDate } from '@/lib/date/format';
import onEnterPressed from '@/lib/keys/enter';

export default function AddButton() {
    const nullCommitment = { title: '', doneBy: formatDate(new Date(), 'yyyy-MM-dd') };
    const [commitment, setCommitment] = useState(nullCommitment);
    const [isClosed, closeModal] = useCloseUiComponent();

    const { mutate: createCommitment } = useZact(createCommitmentAction);

    const onSave = async () => {
        if (!commitment.title || !commitment.doneBy) {
            return;
        }

        await createCommitment({ ...commitment, doneBy: dateInputToISOString(commitment.doneBy)! });
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
                    <span className="w-16">I will</span>
                    <Input value={commitment.title}
                        autoFocus
                        onChange={(event) => setCommitment({ ...commitment, title: event.target.value })}
                        onKeyUp={onEnterPressed(onSave)}
                        placeholder="e.g. do this task"
                    />
                </div>
                <div className="mb-4 flex items-center">
                    <span className="w-16">by</span>
                    <Input type="date"
                        value={commitment.doneBy}
                        onChange={(event) => setCommitment({ ...commitment, doneBy: event.target.value })}
                        onKeyUp={onEnterPressed(onSave)}
                        placeholder="done by"
                    />
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

