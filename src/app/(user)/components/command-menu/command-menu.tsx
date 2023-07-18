'use client';

import * as Dialog from '@radix-ui/react-dialog';
import { Command } from 'cmdk';
import { AnimatePresence, motion } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';

import styles from './command-menu.module.css';
import { Commands } from './commands/commands';
import { CommandDescriptor } from './commands/types';
import { CommandMenuContext } from './context';

export default function CommandMenu() {
    const [open, setOpen] = useState(false);
    const [selectedCommand, setSelectedCommand] = useState<any>('');
    const [commandList, setCommandList] = useState<any>(Commands);
    const containerElement = useRef(null);

    useEffect(() => {
        const onKeyDown = (e: KeyboardEvent) => {
            if (e.key === 'k' && e.metaKey) {
                setCommandList(Commands);
                setSelectedCommand('');
                setOpen((isOpen) => !isOpen);
            }
        };

        document.addEventListener('keydown', onKeyDown);

        return () => document.removeEventListener('keydown', onKeyDown);
    }, []);

    function onNewCommandSelected(commands: CommandDescriptor) {
        setSelectedCommand('');
        setCommandList(commands);
    }

    return (
        <CommandMenuContext.Provider value={{ setCommandList: onNewCommandSelected }}>
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
                                        {commandList[selectedCommand].view}
                                    </motion.div>
                                ) : (
                                    <motion.div exit={{ opacity: 0.2, transition: { duration: 0.4 } }} key="command-list">
                                        <Command>
                                            <Command.Input autoFocus />
                                            <Command.List>
                                                <Command.Empty>No results found.</Command.Empty>

                                                <Command.Group heading="Commands">
                                                    {
                                                        Object.keys(commandList).map((commandName) => (
                                                            <Command.Item key={commandName} onSelect={() => setSelectedCommand(commandName)}>
                                                                <span>{commandList[commandName].title}</span>
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
        </CommandMenuContext.Provider>
    );
}
