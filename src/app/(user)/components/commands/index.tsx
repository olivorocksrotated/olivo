import { ReactNode } from 'react';

type CommandDescriptor = {
    [key: string]: { view: ReactNode, title: string, action: { label: string } }
};

export const Commands: CommandDescriptor = {};
