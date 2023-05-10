'use client';
import * as Dialog from '@radix-ui/react-dialog';
import { MouseEvent, useState } from 'react';
import { IoCloseOutline } from 'react-icons/io5';

import Button from './button';

type Properties = {
    children: React.ReactNode;
    label: string;
    actionDisabled?: boolean;
    onSubmit: (event: MouseEvent<HTMLButtonElement>) => void
    onClose?: () => void
};

export default function DialogButton({
    children,
    label,
    actionDisabled = false,
    onSubmit = () => undefined,
    onClose = () => undefined
}: Properties) {
    const [isDialogOpen, setIsDialogOpen] = useState(false);

    const close = () => {
        setIsDialogOpen(false);
        onClose();
    };

    const handleOpenChanged = (isOpen: boolean) => {
        if (!isOpen) {
            close();
        }
    };

    return (
        <Dialog.Root onOpenChange={handleOpenChanged}>
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
                        <div className="flex justify-between mb-6">
                            <Dialog.Title className="font-normal">{label}</Dialog.Title>
                            <Dialog.Close asChild onClick={close} aria-label="close">
                                <div><Button><IoCloseOutline /></Button></div>
                            </Dialog.Close>
                        </div>
                        <div>{children}</div>
                        <div className="text-right">
                            <Button type="submit" disabled={actionDisabled} onClick={onSubmit} glowing={true} aria-label={label}>
                                Add
                            </Button>
                        </div>
                    </Dialog.Content>
                </Dialog.Portal> :
                null}
        </Dialog.Root>
    );
}
