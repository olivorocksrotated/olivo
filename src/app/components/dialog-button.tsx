'use client';

import * as Dialog from '@radix-ui/react-dialog';
import { AnimatePresence, motion } from 'framer-motion';
import { MouseEvent, useState } from 'react';
import { IoCloseOutline } from 'react-icons/io5';

import Button from './button';

type Properties = {
    children: React.ReactNode;
    dialog: {
        title: string;
        actionLabel: string;
        actionDisabled?: boolean;
    };
    openButton: React.ReactNode;
    onSubmit: (event: MouseEvent<HTMLButtonElement>) => void
    onClose?: () => void
};

export default function DialogButton({
    children,
    dialog,
    openButton,
    onSubmit = () => undefined,
    onClose = () => undefined
}: Properties) {
    const [isDialogOpen, setIsDialogOpen] = useState(false);

    const close = () => {
        setIsDialogOpen(false);
        onClose();
    };

    const handleOnSubmit = (event: MouseEvent<HTMLButtonElement>) => {
        onSubmit(event);
        close();
    };

    return (
        <Dialog.Root>
            <Dialog.Trigger asChild>
                <div onClick={() => setIsDialogOpen(true)}>{openButton}</div>
            </Dialog.Trigger>
            <AnimatePresence>
                {isDialogOpen ?
                    <Dialog.Portal forceMount key="dialog">
                        <motion.div initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                        >
                            <Dialog.Overlay forceMount className="fixed inset-0 bg-black opacity-60" />
                            <Dialog.Content forceMount
                                className="fixed left-2/4 top-2/4 max-h-[85vh] w-[90vw] max-w-md -translate-x-1/2 -translate-y-1/2 rounded bg-neutral-900 p-6"
                                onEscapeKeyDown={close}
                            >
                                <div className="mb-6 flex justify-between">
                                    <Dialog.Title className="font-normal">{dialog.title}</Dialog.Title>
                                    <Dialog.Close asChild onClick={close} aria-label="close">
                                        <div><Button><IoCloseOutline /></Button></div>
                                    </Dialog.Close>
                                </div>
                                <form>
                                    <div>{children}</div>
                                    <div className="text-right">
                                        <Button type="submit" disabled={dialog.actionDisabled ?? false} onClick={handleOnSubmit} glowing={true} aria-label={dialog.title}>
                                            {dialog.actionLabel}
                                        </Button>
                                    </div>
                                </form>
                            </Dialog.Content>
                        </motion.div>
                    </Dialog.Portal> :
                    null}
            </AnimatePresence>
        </Dialog.Root>
    );
}
