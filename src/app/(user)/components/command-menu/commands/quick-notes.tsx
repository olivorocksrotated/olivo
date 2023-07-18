import RichTextEditor from '@/app/components/ui/rich-text-editor/rich-text-editor';

import CommandView from './command-view';
import { CommandDescriptor } from './types';

const subCommands: CommandDescriptor = {
    'add-tags': { title: 'Add tags', view: <div>Add tags</div> }
};

export default function QuickNotesCommand() {
    return (
        <CommandView title="Quick Notes" actionLabel="Save notes" onEsc={() => undefined} commands={subCommands}>
            <RichTextEditor autofocus height="md"></RichTextEditor>
        </CommandView>
    );
}
