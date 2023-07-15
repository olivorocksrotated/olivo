'use client';

import * as Dialog from '@radix-ui/react-dialog';
import { Command } from 'cmdk';
import { AnimatePresence, motion } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';
import { AiOutlineEnter, AiOutlineRollback } from 'react-icons/ai';

import { links } from '@/app/navigation';
import { onKeyPressed } from '@/lib/keys/on-key-pressed';
import { Key } from '@/lib/keys/types';

import styles from './command-menu.module.css';
import { Commands } from './commands/commands';
import LinkCommand from './commands/link';

function CommandBackButton() {
    return (
        <div className="m-2 flex">
            <div className="flex items-center gap-2 rounded bg-neutral-700 px-2 py-1 text-[10px] font-semibold">
                <AiOutlineRollback></AiOutlineRollback><span>ESC</span>
            </div>
        </div>
    );
}

function CommandView({ commandId, onEsc }: { commandId: string, onEsc: () => void }) {
    const onKeyDown = onKeyPressed(Key.Escape, { considerEventHandled: true }, onEsc);

    const command = Commands[commandId];

    return (
        <div onKeyDown={onKeyDown} className="flex h-full flex-col justify-between">
            <div className="flex h-full flex-col">
                <div className="m-2 flex items-center justify-between">
                    <div className="font-bold">{command.title}</div>
                    <CommandBackButton></CommandBackButton>
                </div>
                <div className="grow p-5">
                    {command.view}
                </div>
            </div>
            <div className="flex items-center justify-end gap-2 border-t border-neutral-700 p-2">
                <div>{command.action.label}</div>
                <div className="flex items-center gap-2 rounded bg-neutral-700 p-2 text-sm font-semibold">⌘<AiOutlineEnter></AiOutlineEnter></div>
            </div>
        </div>
    );
}

const noCommand = '';

export default function CommandMenu() {
    const [open, setOpen] = useState(false);
    const [selectedCommand, setSelectedCommand] = useState(noCommand);
    const containerElement = useRef(null);

    useEffect(() => {
        const onKeyDown = (e: KeyboardEvent) => {
            if (e.key === 'k' && e.metaKey) {
                setOpen((isOpen) => !isOpen);
            }
        };

        document.addEventListener('keydown', onKeyDown);

        return () => document.removeEventListener('keydown', onKeyDown);
    }, []);

    return (
        <>
            <Dialog.Root open={open}>
                <Dialog.Portal container={containerElement.current as any}>
                    <Dialog.Content cmdk-dialog="" onEscapeKeyDown={() => setOpen(false)}>
                        <div className="h-96 rounded-lg border-0 bg-neutral-950">

                            <AnimatePresence mode="wait">
                                {selectedCommand !== '' ? (
                                    <motion.div key="selected-command-view"
                                        initial={{ opacity: 0.2, scale: 0.99 }}
                                        exit={{ opacity: 0.2, scale: 0.99 }}
                                        animate={{ opacity: 1, scale: 1, transition: { duration: 0.4 } }}
                                        className="h-full"
                                    >
                                        <CommandView commandId={selectedCommand} onEsc={() => setSelectedCommand(noCommand)}></CommandView>
                                    </motion.div>
                                ) : (
                                    <motion.div exit={{ opacity: 0.2, transition: { duration: 0.4 } }} key="command-list">
                                        <Command>
                                            <Command.Input autoFocus />
                                            <Command.List>
                                                <Command.Empty>No results found.</Command.Empty>

                                                <Command.Group heading="Go to">
                                                    {links.map((link) => <LinkCommand onSelect={() => setOpen(false)} key={link.id} link={link}></LinkCommand>)}
                                                </Command.Group>

                                                <Command.Group heading="Commands">
                                                    {
                                                        Object.keys(Commands).map((commandName) => (
                                                            <Command.Item key={commandName} onSelect={() => setSelectedCommand(commandName)}>
                                                                <span>{Commands[commandName].title}</span>
                                                            </Command.Item>
                                                        ))
                                                    }
                                                </Command.Group>
                                            </Command.List>
                                        </Command>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>
                    </Dialog.Content>
                </Dialog.Portal>
            </Dialog.Root>
            <div className={styles['command-menu']} ref={containerElement}></div>
        </>
    );
}
