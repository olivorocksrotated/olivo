'use client';

import * as Dialog from '@radix-ui/react-dialog';
import { Command } from 'cmdk';
import { AnimatePresence, motion } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';

import styles from './command-menu.module.css';
import { Commands } from './commands/commands';
import { Command as CommandConfig, CommandsList } from './commands/types';
import { CommandMenuContext } from './context';

enum HistoryType {
    CommandKey = 'Command',
    CommandsListKey = 'CommandsList'
}

type CommandMenuHistory<T extends HistoryType = HistoryType> = {
    type: T,
    value: T extends HistoryType.CommandKey ? CommandConfig : CommandsList
};

const defaultHistoryState: CommandMenuHistory<HistoryType.CommandsListKey> = { type: HistoryType.CommandsListKey, value: Commands };

export default function CommandMenu() {
    const [open, setOpen] = useState(false);
    const [selectedCommand, setSelectedCommand] = useState<CommandConfig | null>(null);
    const [history, setHistory] = useState<CommandMenuHistory[]>([defaultHistoryState]);
    const [commandList, setCommandList] = useState<CommandsList>(defaultHistoryState.value);
    const containerElement = useRef(null);

    function close() {
        setCommandList(defaultHistoryState.value);
        setSelectedCommand(null);
        setOpen((isOpen) => !isOpen);
    }

    useEffect(() => {
        const onKeyDown = (e: KeyboardEvent) => {
            if (e.key === 'k' && e.metaKey) {
                return close();
            }

            if (e.key === 'Escape' && open) {
                if (history.length > 1) {
                    history.pop();
                    const prevState = history[history.length - 1];
                    if (prevState?.type === HistoryType.CommandKey) {
                        setSelectedCommand(prevState.value as CommandConfig);
                    } else if (prevState?.type === HistoryType.CommandsListKey) {
                        setSelectedCommand(null);
                        setCommandList(prevState.value as CommandsList);
                    }
                    setHistory([...history]);
                } else {
                    close();
                }
            }
        };

        document.addEventListener('keydown', onKeyDown);

        return () => document.removeEventListener('keydown', onKeyDown);
    }, [open, history]);

    function onNewCommands(commands: CommandsList) {
        setHistory([...history, { type: HistoryType.CommandsListKey, value: commands }]);
        setSelectedCommand(null);
        setCommandList(commands);
    }

    function onSelectCommand(commandName: string) {
        const command = commandList[commandName];
        setHistory([...history, { type: HistoryType.CommandKey, value: command }]);
        setSelectedCommand(command);
    }

    return (
        <CommandMenuContext.Provider value={{ setCommandList: onNewCommands }}>
            <Dialog.Root open={open}>
                <Dialog.Portal container={containerElement.current as any}>
                    <Dialog.Content cmdk-dialog="">
                        <div className="h-96 rounded-lg border-0 bg-neutral-950">
                            <AnimatePresence mode="wait">
                                {selectedCommand ? (
                                    <motion.div key="selected-command-view"
                                        initial={{ opacity: 0.2, scale: 0.99 }}
                                        exit={{ opacity: 0.2, scale: 0.99 }}
                                        animate={{ opacity: 1, scale: 1, transition: { duration: 0.4 } }}
                                        className="h-full"
                                    >
                                        {selectedCommand.view}
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
                                                            <Command.Item key={commandName} onSelect={() => onSelectCommand(commandName)}>
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
