import { ReactNode } from 'react';

export type Command = { view: ReactNode, title: string };

export type CommandsList = { [commandsGroup: string]: { [commandName: string]: Command } };
