import { links } from '@/app/navigation';

import LinkCommand from './link';
import QuickNotesCommand from './quick-notes';
import { CommandsList } from './types';

const linkCommands = links.reduce((linkCommandsList, link) => ({
    ...linkCommandsList,
    [link.title]: {
        view: <LinkCommand link={link} onSelect={() => undefined}></LinkCommand>,
        title: link.title
    }
}), {});

export const Commands: CommandsList = {
    ...linkCommands,
    'quick-notes': {
        view: <QuickNotesCommand></QuickNotesCommand>,
        title: 'Quick note'
    }
};
