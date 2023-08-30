'use client';

import { Note } from '@prisma/client';
import Mention from '@tiptap/extension-mention';
import Typography from '@tiptap/extension-typography';
import { Node } from '@tiptap/pm/model';
import { Selection } from '@tiptap/pm/state';
import { BubbleMenu, EditorContent, useEditor } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import { useState } from 'react';
import { useZact } from 'zact/client';

import Loader from '@/app/components/ui/loader/loader';
import useDebouncedCallback from '@/lib/hooks/useDebouncedCallback';
import { updateNoteAction } from '@/lib/notes/update';

import styles from './daily-note-editor.module.css';
import { getTagsFromFragment } from './editor-utils';
import Options from './options';
import suggestion from './suggestions';
import { Tag } from './tag';

const editorStyles = 'rounded bg-neutral-800 px-2 py-3 leading-relaxed outline-none overflow-y-auto w-full h-full ' +
    'disabled:cursor-not-allowed disabled:opacity-50 ';

const mentionStyles = 'text-pink-400 font-bold italic';

const tagStyles = 'text-purple-400 font-bold italic';

const tippyOptions = { duration: 100, placement: 'bottom-end' } as const;

const network = ['Rafa', 'Andrey', 'Irem', 'Ali', 'Lisa', 'Beto', 'Oleh', 'Cozette', 'Oscar', 'Alex'];

function SavingIndicator() {
    return (
        <div className="absolute right-2 top-2 z-10 rounded border border-red-400 px-1 text-sm text-red-400">
            <Loader intent="inner" size="xs"></Loader>
            <span className="pl-2">Saving</span>
        </div>
    );
}

function EditorLoader() {
    return (
        <div className="flex h-full w-full items-center justify-center bg-neutral-950">
            <Loader intent="standalone" size="s"></Loader>
        </div>
    );
}

export function DailyNoteEditor({ note, tags }: { note: Note, tags: string[] }) {
    const [isSaving, setIsSaving] = useState(false);
    const [selection, setSelection] = useState<Selection>();
    const { mutate: handleSave } = useZact(updateNoteAction);

    const debounceSelection = useDebouncedCallback(setSelection, 500, [note.id]);

    const debounceSave = useDebouncedCallback(async (node: Node, id: string) => {
        const currentTagsFromText = getTagsFromFragment(node);
        setIsSaving(true);
        await handleSave({ text: JSON.stringify(node), id, tags: currentTagsFromText });
        await new Promise((resolve) => setTimeout(resolve, 1000)); // Temporary hack to show saving message for a bit
        setIsSaving(false);
    }, 500, [note.id]);

    const editorOptions = {
        extensions: [
            Typography,
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
                suggestion: suggestion(tags)
            })
        ],
        autofocus: 'end' as const,
        editorProps: {
            attributes: {
                class: `${editorStyles} ${styles.ProseMirror}`
            }
        }
    };

    const editor = useEditor({
        ...editorOptions,
        content: JSON.parse(note.text),
        onUpdate: ({ editor: editorObject }) => debounceSave(editorObject.state.doc, note.id),
        onSelectionUpdate: ({ transaction }) => debounceSelection(transaction.selection)
    });

    if (!editor) {
        return <EditorLoader />;
    }

    return (
        <div className="relative h-full w-full">
            {isSaving ? <SavingIndicator /> : null}
            <div className="h-full w-full">
                <BubbleMenu className="flex flex-col items-start rounded bg-neutral-600" editor={editor} tippyOptions={tippyOptions}>
                    <Options selection={selection}></Options>
                </BubbleMenu>
                <EditorContent className="h-full w-full" editor={editor} />
            </div>
        </div>
    );
}
