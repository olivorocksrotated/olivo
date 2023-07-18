import { ReactNode } from 'react';

export type CommandDescriptor = {
    [key: string]: { view: ReactNode, title: string }
};
