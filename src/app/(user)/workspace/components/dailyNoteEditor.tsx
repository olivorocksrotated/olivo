'use client';
import { Note } from '@prisma/client';
import Heading from '@tiptap/extension-heading';
import Mention from '@tiptap/extension-mention';
import Typography from '@tiptap/extension-typography';
import { BubbleMenu, EditorContent, useEditor } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import { useState } from 'react';
import { useZact } from 'zact/client';

import useDebouncedCallback from '@/lib/hooks/useDebouncedCallback';
import { updateNoteAction } from '@/lib/notes/update';

import styles from './daily-note-editor.module.css';
import Options from './options';
import suggestion from './suggestions';
import { Tag } from './tag';

const editorStyles = 'rounded bg-neutral-800 px-2 py-3 leading-relaxed outline-none overflow-y-auto w-full h-full ' +
    'disabled:cursor-not-allowed disabled:opacity-50 ';

const mentionStyles = 'text-pink-400 font-bold italic';

const tagStyles = 'text-purple-400 font-bold italic';

const tippyOptions = { duration: 100, placement: 'bottom-end' } as const;

const network = ['Rafa', 'Andrey', 'Irem'];

const editorOptions = {
    extensions: [
        Typography,
        Heading,
        StarterKit.configure({
            bulletList: {
                keepMarks: true,
                keepAttributes: false
            },
            orderedList: {
                keepMarks: true,
                keepAttributes: false
            }
        }),
        Mention.configure({
            HTMLAttributes: {
                class: mentionStyles
            },
            suggestion: suggestion(network)
        }),
        Tag.configure({
            HTMLAttributes: {
                class: tagStyles
            },
            suggestion: suggestion([...network, 'ProjectX'])
        })
    ],
    autofocus: 'end' as const,
    editorProps: {
        attributes: {
            class: `${editorStyles} ${styles.ProseMirror}`
        }
    }
};

export function DailyNoteEditor({ note }: { note: Note }) {
    const [isSaving, setIsSaving] = useState(false);
    const { mutate: handleSave } = useZact(updateNoteAction);
    const debounceSave = useDebouncedCallback(async (text: string, id: string) => {
        setIsSaving(true);
        await handleSave({ text, id });
        await new Promise((resolve) => setTimeout(resolve, 1000)); // Temporary hack to show saving message for a bit
        setIsSaving(false);
    }, 500, [note.id]);

    const editor = useEditor({
        ...editorOptions,
        content: JSON.parse(note.text),
        onUpdate: ({ editor: editorObject }) => debounceSave(JSON.stringify(editorObject.getJSON()), note.id)
    });

    if (!editor) {
        return <div>Loading...</div>;
    }

    return (
        <div className="relative h-full w-full">
            {isSaving ? <div className="absolute right-0 top-0 z-10 text-sm">Saving...</div> : null}
            <div className="h-full w-full">
                <BubbleMenu className="flex flex-col items-start rounded bg-neutral-600" editor={editor} tippyOptions={tippyOptions}>
                    <Options></Options>
                </BubbleMenu>
                <EditorContent className="h-full w-full" editor={editor} />
            </div>
        </div>
    );
}
