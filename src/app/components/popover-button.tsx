'use client';

import * as Popover from '@radix-ui/react-popover';
import { useState } from 'react';

import Button from './button';

export default function PopoverButton({ children, label }: { children: React.ReactNode; label: string }) {
    const [isPopoverOpen, setIsPopoverOpen] = useState(false);

    return (
        <Popover.Root open={isPopoverOpen}>
            <Popover.Trigger asChild>
                <div><Button onClick={() => setIsPopoverOpen(true)} aria-label={label}>{label}</Button></div>
            </Popover.Trigger>
            <Popover.Portal>
                <Popover.Content className="rounded py-10 px-3 w-[460px] bg-zinc-800 text-zinc-400 border border-solid border-zinc-600 relative"
                    align="start"
                >
                    {children}
                    <Popover.Close className="inline-flex items-center text-sm justify-center absolute top-[5px] right-[10px] bg-zinc-900 rounded-lg px-2 py-1"
                        aria-label="Close"
                        onClick={() => setIsPopoverOpen(false)}
                    >
                    close
                    </Popover.Close>
                </Popover.Content>
            </Popover.Portal>
        </Popover.Root>
    );
}
