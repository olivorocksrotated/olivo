import QuickNotesCommand from './quick-notes';
import { CommandDescriptor } from './types';

export const Commands: CommandDescriptor = {
    'quick-notes': {
        view: <QuickNotesCommand></QuickNotesCommand>,
        title: 'Quick note',
        action: { label: 'Save note' }
    }
};
