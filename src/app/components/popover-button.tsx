'use client';

import * as Popover from '@radix-ui/react-popover';
import { AnimatePresence, motion } from 'framer-motion';
import { useState } from 'react';

import Button from './button';

type Properties = {
    children: React.ReactNode;
    label: string;
    onClose?: () => void
};

export default function PopoverButton({ children, label, onClose }: Properties) {
    const [isPopoverOpen, setIsPopoverOpen] = useState(false);

    function onOpenChanged(isOpen: boolean) {
        if (!isOpen) {
            onClose!();
        }
    }

    async function close() {
        setIsPopoverOpen(false);
    }

    return (
        <Popover.Root onOpenChange={onOpenChanged}>
            <Popover.Trigger asChild>
                <div><Button onClick={() => setIsPopoverOpen(true)} aria-label={label}>{label}</Button></div>
            </Popover.Trigger>
            <AnimatePresence>
                {isPopoverOpen ?
                    <Popover.Portal forceMount>
                        <Popover.Content forceMount className="rounded min-w-[460px] mt-2 text-zinc-400"
                            align="start"
                            onEscapeKeyDown={close}
                        >
                            <motion.div className="bg-zinc-800 border border-solid border-zinc-600 pb-8 pt-2 px-3"
                                key="modal"
                                initial={{ opacity: 0, scale: 0.85 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ duration: 0.5, type: 'spring', bounce: 0.15 }}
                                exit={{ opacity: 0, scale: 0.85 }}
                            >
                                <div className="flex justify-end">
                                    <Popover.Close className="inline-flex items-center text-sm justify-center bg-zinc-900 rounded-lg px-2 py-1"
                                        aria-label="Close"
                                        onClick={close}
                                    >
                                        Close
                                    </Popover.Close>
                                </div>
                                {children}
                            </motion.div>
                        </Popover.Content>
                    </Popover.Portal> :
                    null}
            </AnimatePresence>
        </Popover.Root>
    );
}
