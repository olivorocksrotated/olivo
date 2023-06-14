'use client';

import * as Dialog from '@radix-ui/react-dialog';
import { AnimatePresence, motion } from 'framer-motion';
import { useCallback, useEffect, useState } from 'react';
import { IoCloseOutline } from 'react-icons/io5';

import IconButton from '../icon-button/icon-button';

interface Props {
    children: React.ReactNode;
    title: string;
    openComponent: React.ReactNode;
    close?: boolean;
    description?: string;
    onClose?: () => void;
}

export default function Modal({
    children,
    title,
    openComponent,
    description,
    close,
    onClose = () => undefined
}: Props) {
    const [isDialogOpen, setIsDialogOpen] = useState(false);

    const closeModal = useCallback(() => {
        setIsDialogOpen(false);
        onClose();
    }, []);

    useEffect(() => {
        if (close) {
            closeModal();
        }
    }, [close, closeModal]);

    return (
        <Dialog.Root open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <Dialog.Trigger asChild><div>{openComponent}</div></Dialog.Trigger>
            <AnimatePresence>
                {isDialogOpen ?
                    <Dialog.Portal forceMount key="dialog">
                        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                            <Dialog.Overlay forceMount className="fixed inset-0 bg-black opacity-60" />
                            <Dialog.Content forceMount
                                className="fixed left-2/4 top-2/4 max-h-[85vh] w-[90vw] max-w-md -translate-x-1/2 -translate-y-1/2 rounded bg-neutral-900 p-6"
                                onEscapeKeyDown={closeModal}
                            >
                                <div className="mb-2 flex justify-between">
                                    <Dialog.Title className="text-lg font-normal">{title}</Dialog.Title>
                                    <Dialog.Close asChild onClick={closeModal}>
                                        <div><IconButton icon={IoCloseOutline} label="Close modal" /></div>
                                    </Dialog.Close>
                                </div>
                                {description ? <div className="mb-6 text-sm text-neutral-200">{description}</div> : null}
                                {children}
                            </Dialog.Content>
                        </motion.div>
                    </Dialog.Portal> :
                    null}
            </AnimatePresence>
        </Dialog.Root>
    );
}
