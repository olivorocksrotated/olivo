'use client';

import { MouseEvent, useState } from 'react';

import Button from '@/app/components/button';
import DialogButton from '@/app/components/dialog-button';

export default function ConnectButton({ onConnectionRequested }: { onConnectionRequested: (email: string) => void }) {
    const [email, setEmail] = useState<string>();

    async function onSubmit(event: MouseEvent<HTMLButtonElement>) {
        event.preventDefault();
        if (email) {
            onConnectionRequested(email);
            setEmail('');
        }
    }


    function reset() {
        setEmail('');
    }

    return (
        <DialogButton onClose={reset}
            onSubmit={onSubmit}
            dialog={{
                title: 'Add the email of the user you would like to connect with',
                actionLabel: 'Connect',
                actionDisabled: !email
            }}
            openButton={<Button>Connect</Button>}
        >
            <div className="mb-4">
                <div className="">
                    <input id="email"
                        value={email}
                        onChange={(event) => setEmail(event.target.value)}
                        placeholder="email"
                        className="inline-flex h-8 w-full items-center justify-center rounded px-2.5 leading-none outline-none"
                    />
                </div>
            </div>
        </DialogButton>
    );
}
