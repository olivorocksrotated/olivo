'use client';

import Typography from '@tiptap/extension-typography';
import { EditorContent, isEmptyObject, JSONContent, useEditor } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import { cva, VariantProps } from 'cva';

import { editorContentStyles } from './rich-text-editor.styles';

const richTextEditorStyles = cva(
    'rounded bg-neutral-600 px-4 py-3 leading-relaxed outline-none overflow-y-auto ' +
    'focus:outline-none focus:outline-neutral-400 ' +
    'hover:enabled:outline-1 hover:enabled:outline-neutral-400 ' +
    'disabled:cursor-not-allowed disabled:opacity-50',
    {
        variants: {
            width: {
                s: 'w-48',
                md: 'w-64',
                lg: 'w-80',
                full: 'w-full'
            },
            height: {
                s: 'h-32 max-h-32',
                md: 'h-48 max-h-48',
                lg: 'h-64 max-h-64',
                full: 'h-full'
            }
        },
        defaultVariants: {
            height: 'full',
            width: 'full'
        }
    }
);

interface Props extends VariantProps<typeof richTextEditorStyles> {
    value: JSONContent;
    autofocus: boolean;
    onChange: (value: JSONContent) => void;
}

export default function RichTextEditor({
    value,
    autofocus = false,
    onChange = () => undefined,
    ...props
}: Partial<Props>) {
    const editorInstance = useEditor({
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
            })
        ],
        autofocus,
        content: !isEmptyObject(value) ? value : undefined,
        onUpdate: ({ editor }) => onChange(editor.getJSON()),
        editorProps: {
            attributes: {
                class: `${richTextEditorStyles(props)} ${editorContentStyles}`
            }
        }
    });

    return <EditorContent editor={editorInstance} />;
}
