'use client';
import Heading from '@tiptap/extension-heading';
import Mention from '@tiptap/extension-mention';
import Typography from '@tiptap/extension-typography';
import { BubbleMenu, EditorContent, useEditor } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';

import Options from './options';
import suggestion from './suggestions';
import { Tag } from './tag';

const styles = 'rounded bg-neutral-800 px-2 py-3 leading-relaxed outline-none overflow-y-auto w-full h-full ' +
    'disabled:cursor-not-allowed disabled:opacity-50 ';

const mentionStyles = 'text-pink-400 font-bold italic';

const tagStyles = 'text-purple-400 font-bold italic';

const tippyOptions = { duration: 100, placement: 'bottom-end' } as const;

const content = '';

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
    autofocus: true,
    content,
    editorProps: {
        attributes: {
            class: styles
        }
    }
};

export function DailyNotes() {
    const editor = useEditor(editorOptions);

    if (!editor) {
        return <div>Loading...</div>;
    }

    return (
        <>
            <BubbleMenu className="flex flex-col items-start rounded bg-neutral-600" editor={editor} tippyOptions={tippyOptions}>
                <Options></Options>
            </BubbleMenu>
            <EditorContent content={content} className="h-full w-full" editor={editor} />
        </>
    );
}
