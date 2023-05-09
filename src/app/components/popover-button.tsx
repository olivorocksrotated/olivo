'use client';
import * as Dialog from '@radix-ui/react-dialog';
import { useState } from 'react';
import { IoCloseOutline } from 'react-icons/io5';

import Button from './button';

type Properties = {
    children: React.ReactNode;
    label: string;
    onClose?: () => void
};

export default function PopoverButton({ children, label, onClose }: Properties) {
    const [isDialogOpen, setIsDialogOpen] = useState(false);

    function onOpenChanged(isOpen: boolean) {
        if (!isOpen) {
            onClose!();
        }
    }

    async function close() {
        setIsDialogOpen(false);
    }

    return (
        <Dialog.Root onOpenChange={onOpenChanged}>
            <Dialog.Trigger asChild>
                <div><Button onClick={() => setIsDialogOpen(true)} aria-label={label}>{label}</Button></div>
            </Dialog.Trigger>
            {isDialogOpen ?
                <Dialog.Portal forceMount>
                    <Dialog.Overlay forceMount className="bg-black opacity-60 fixed inset-0" />
                    <Dialog.Content forceMount
                        className="fixed top-2/4 left-2/4 -translate-x-1/2 -translate-y-1/2 w-[90vw] max-w-md max-h-[85vh] p-6 rounded bg-gray-900"
                        onEscapeKeyDown={close}
                    >
                        <div className="flex justify-between">
                            <Dialog.Title className="font-normal">{label}</Dialog.Title>
                            <Dialog.Close asChild onClick={close} aria-label="close">
                                <Button><IoCloseOutline /></Button>
                            </Dialog.Close>
                        </div>
                        <div>{children}</div>
                    </Dialog.Content>
                </Dialog.Portal> :
                null}
        </Dialog.Root>
    );
}
