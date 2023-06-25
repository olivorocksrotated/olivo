'use client';

import Typography from '@tiptap/extension-typography';
import { EditorContent, JSONContent, useEditor } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import { cva, VariantProps } from 'cva';

import styles from './rich-text-editor.module.css';

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
    content: JSONContent;
    autofocus: boolean;
    onChange: (value: JSONContent) => void;
}

export default function RichTextEditor({ content, autofocus = false, onChange = () => undefined, ...props }: Partial<Props>) {
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
        content: {
            type: 'doc',
            content: content ? [content] : []
        },
        onUpdate: ({ editor }) => onChange(editor.getJSON()),
        editorProps: {
            attributes: {
                class: `${richTextEditorStyles(props)} ${styles.ProseMirror}`
            }
        }
    });

    return <EditorContent editor={editorInstance} />;
}
