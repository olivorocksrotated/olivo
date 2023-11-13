'use client';

import { NoteStatus } from '@prisma/client';
import Document from '@tiptap/extension-document';
import HardBreak from '@tiptap/extension-hard-break';
import Heading from '@tiptap/extension-heading';
import Paragraph from '@tiptap/extension-paragraph';
import Text from '@tiptap/extension-text';
import { generateHTML } from '@tiptap/react';
import { motion } from 'framer-motion';
import { useAction } from 'next-safe-action/hook';
import { BsCheck } from 'react-icons/bs';
import { TbTrash } from 'react-icons/tb';

import { updateNoteStatusAction } from '@/lib/notes/update-status';

const extensions = [Document, Paragraph, Text, HardBreak, Heading];

function ActionButton({ children, onClick }: { children: React.ReactNode; onClick?: () => void }) {
    return (
        <motion.div whileHover={{ scale: 1.2, transition: { duration: 0.3 } }}>
            <div onClick={onClick} className="cursor-pointer rounded border border-neutral-900 bg-neutral-950 p-1">{children}</div>
        </motion.div>
    );
}

export default function Note({ text, id }: { text: string, id: string }) {
    const doc = JSON.parse(text);

    const { execute: updateNoteStatus } = useAction(updateNoteStatusAction);

    const remove = () => updateNoteStatus({ id, status: NoteStatus.Archived });
    const resolve = () => updateNoteStatus({ id, status: NoteStatus.Resolved });

    return (
        <div className="flex justify-between rounded-lg border border-neutral-900 bg-neutral-950 p-2 text-neutral-200">
            <div
                className="mb-3"
                // eslint-disable-next-line react/no-danger
                dangerouslySetInnerHTML={{ __html: generateHTML(doc, extensions) }}
            >
            </div>
            <div className="flex items-start gap-3">
                <ActionButton onClick={resolve}><BsCheck></BsCheck></ActionButton>
                <ActionButton onClick={remove}><TbTrash></TbTrash></ActionButton>
            </div>
        </div>
    );
}
