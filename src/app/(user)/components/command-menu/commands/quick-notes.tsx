import RichTextEditor from '@/app/components/ui/rich-text-editor/rich-text-editor';

import CommandView from './command-view';

export default function QuickNotesCommand() {
    return (
        <CommandView title="Quick Notes" actionLabel="Save notes" onEsc={() => undefined}>
            <RichTextEditor autofocus height="md"></RichTextEditor>
        </CommandView>
    );
}
