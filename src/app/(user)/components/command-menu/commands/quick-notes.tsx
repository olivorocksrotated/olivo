'use client';
import { createContext, ReactNode, useContext, useState } from 'react';
import { useZact } from 'zact/client';

import Input from '@/app/components/ui/input/input';
import RichTextEditor from '@/app/components/ui/rich-text-editor/rich-text-editor';
import { onKeyPressed } from '@/lib/keys/on-key-pressed';
import { Key } from '@/lib/keys/types';
import { createNoteAction } from '@/lib/notes/create';

import CommandView from './command-view';
import { CommandsList } from './types';

function Tag({ children }: { children: ReactNode }) {
    return (
        <div className="rounded-lg border border-neutral-600 px-2 py-1 text-sm">
            {children}
        </div>
    );
}

const CommandContext = createContext<string | null>(null);

function AddTags() {
    const commandContext = useContext(CommandContext) as string;
    const [tags, setTags] = useState<string[]>([]);
    const [value, setValue] = useState('');

    const onInput = (event: any) => setValue(event.target.value);
    const { mutate: createNote } = useZact(createNoteAction);
    const action = {
        label: 'Save notes',
        execute: () => createNote({ text: commandContext })
    };

    const onKeyDown = onKeyPressed([[Key.Enter, { considerEventHandled: true }, () => {
        if (value) {
            setTags([...tags, value]);
            setValue('');
        }
    }]]);

    return (
        <CommandView title="Add Tags" action={action}>
            <Input value={value} onInput={onInput} onKeyDown={onKeyDown}></Input>
            <div className="mt-5 flex flex-wrap gap-2">
                {tags.map((tag) => <Tag key={tag}>{tag}</Tag>)}
            </div>
        </CommandView>
    );
}

const subCommands: CommandsList = {
    'add-tags': {
        title: 'Add tags',
        view: <AddTags />
    }
};

export default function QuickNotesCommand() {
    const [text, setText] = useState('');
    const { mutate: createNote } = useZact(createNoteAction);
    const action = {
        label: 'Save notes',
        execute: () => createNote({ text })
    };

    return (
        <CommandContext.Provider value={text}>
            <CommandView title="Quick Notes" action={action} commands={subCommands}>
                <RichTextEditor onChange={(content) => setText(JSON.stringify(content))} autofocus height="md"></RichTextEditor>
            </CommandView>
        </CommandContext.Provider>
    );
}
