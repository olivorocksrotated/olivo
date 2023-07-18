import RichTextEditor from '@/app/components/ui/rich-text-editor/rich-text-editor';

import CommandView from './command-view';
import { CommandDescriptor } from './types';

function AddTags() {
    return (
        <CommandView title="Add Tags" actionLabel="Save notes" onEsc={() => undefined}>
            <input></input>
        </CommandView>
    );
}

const subCommands: CommandDescriptor = {
    'add-tags': {
        title: 'Add tags',
        view: <AddTags />
    }
};

export default function QuickNotesCommand() {
    return (
        <CommandView title="Quick Notes" actionLabel="Next" onEsc={() => undefined} commands={subCommands}>
            <RichTextEditor autofocus height="md"></RichTextEditor>
        </CommandView>
    );
}
