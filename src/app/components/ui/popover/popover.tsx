'use client';

import * as RadixPopover from '@radix-ui/react-popover';
import { AnimatePresence, motion } from 'framer-motion';
import { useCallback, useEffect, useState } from 'react';

interface Props {
    children: React.ReactNode;
    openComponent: React.ReactNode;
    align?: 'start' | 'center' | 'end';
    close?: boolean;
    onClose?: () => void;
}

export default function Popover({
    children,
    openComponent,
    align = 'start',
    close,
    onClose = () => undefined
}: Props) {
    const [isPopoverOpen, setIsPopoverOpen] = useState(false);

    const closePopover = useCallback(() => {
        setIsPopoverOpen(false);
        onClose();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(() => {
        if (close) {
            closePopover();
        }
    }, [close, closePopover]);

    return (
        <RadixPopover.Root onOpenChange={setIsPopoverOpen} open={isPopoverOpen}>
            <RadixPopover.Trigger asChild><div>{openComponent}</div></RadixPopover.Trigger>
            <AnimatePresence>
                {isPopoverOpen ?
                    <RadixPopover.Portal key="popover" forceMount>
                        <RadixPopover.Content align={align}>
                            <motion.div className="w-52 rounded bg-neutral-700 p-2 text-sm shadow-sm"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                transition={{ duration: 0.2 }}
                            >
                                {children}
                            </motion.div>
                        </RadixPopover.Content>
                    </RadixPopover.Portal> : null}
            </AnimatePresence>
        </RadixPopover.Root>
    );
}
