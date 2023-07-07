import { ReactNode } from 'react';

import QuickNotesCommand from './quick-notes';

type CommandDescriptor = {
    [key: string]: { view: ReactNode, title: string, action: { label: string } }
};

export const Commands: CommandDescriptor = {
    'quick-notes': {
        view: <QuickNotesCommand></QuickNotesCommand>,
        title: 'Quick note',
        action: { label: 'Save note' }
    }
};
