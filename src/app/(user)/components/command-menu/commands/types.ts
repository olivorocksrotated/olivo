import { ReactNode } from 'react';

export type Command = { view: ReactNode, title: string };

export type CommandsList = { [key: string]: Command };
