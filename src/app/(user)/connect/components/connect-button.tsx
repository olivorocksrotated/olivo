'use client';

import { MouseEvent, useState } from 'react';

import Button from '@/app/components/ui/button/button';
import { useCloseUiComponent } from '@/app/components/ui/hooks/useCloseUiComponent';
import Input from '@/app/components/ui/input/input';
import Modal from '@/app/components/ui/modal/modal';
import ModalContent from '@/app/components/ui/modal/modal-content';
import ModalFooter from '@/app/components/ui/modal/modal-footer';

export default function ConnectButton({ onConnectionRequested }: { onConnectionRequested: (email: string) => void }) {
    const [email, setEmail] = useState('');
    const [isClosed, closeModal] = useCloseUiComponent();

    function reset() {
        setEmail('');
    }

    async function onSubmit(event: MouseEvent<HTMLButtonElement>) {
        event.preventDefault();
        if (email) {
            onConnectionRequested(email);
            reset();
            closeModal();
        }
    }

    return (
        <Modal
            title="Connect"
            description="Add the email of the user you would like to connect with"
            close={isClosed}
            openComponent={<Button label="Connect" />}
        >
            <ModalContent>
                <Input
                    type="email"
                    value={email}
                    onChange={(event) => setEmail(event.target.value)}
                    placeholder="E.g. john@doe.com"
                />
            </ModalContent>
            <ModalFooter>
                <Button intent="cta" label="Connect" disabled={!email} onClick={onSubmit} />
            </ModalFooter>
        </Modal>
    );
}
