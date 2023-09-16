'use client';

import * as Dialog from '@radix-ui/react-dialog';
import clsx from 'clsx';
import { cva, VariantProps } from 'cva';
import { AnimatePresence, motion } from 'framer-motion';
import { useCallback, useEffect, useState } from 'react';
import { IoCloseOutline } from 'react-icons/io5';

import IconButton from '../icon-button/icon-button';

const modalStyles = cva(
    'fixed left-2/4 top-2/4 max-h-[85vh] w-full max-w-[90vw] -translate-x-1/2 -translate-y-1/2 overflow-y-auto rounded bg-neutral-900 p-6',
    {
        variants: {
            size: {
                s: 'sm:w-[28rem]',
                md: 'sm:w-5/12',
                lg: 'sm:w-8/12'
            }
        },
        defaultVariants: {
            size: 'md'
        }
    }
);

interface Props extends VariantProps<typeof modalStyles> {
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
    onClose = () => undefined,
    size
}: Props) {
    const [isDialogOpen, setIsDialogOpen] = useState(false);

    const closeModal = useCallback(() => {
        setIsDialogOpen(false);
        onClose();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(() => {
        if (close) {
            closeModal();
        }
    }, [close, closeModal]);

    const titleStyles = clsx(
        'flex justify-between',
        { 'mb-2': description },
        { 'mb-6': !description }
    );

    return (
        <Dialog.Root open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <Dialog.Trigger asChild><div>{openComponent}</div></Dialog.Trigger>
            <AnimatePresence>
                {isDialogOpen ?
                    <Dialog.Portal forceMount key="dialog">
                        <motion.div initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.2 }}
                        >
                            <Dialog.Overlay forceMount className="fixed inset-0 bg-black opacity-60" />
                            <Dialog.Content forceMount
                                className={modalStyles({ size })}
                                onEscapeKeyDown={closeModal}
                            >
                                <div className={titleStyles}>
                                    <Dialog.Title className="text-lg font-normal">{title}</Dialog.Title>
                                    <Dialog.Close asChild onClick={closeModal}>
                                        <div><IconButton icon={IoCloseOutline} label="Close modal" size="s" /></div>
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
