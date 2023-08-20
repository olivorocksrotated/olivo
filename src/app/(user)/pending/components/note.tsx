'use client';

import Document from '@tiptap/extension-document';
import HardBreak from '@tiptap/extension-hard-break';
import Heading from '@tiptap/extension-heading';
import Paragraph from '@tiptap/extension-paragraph';
import Text from '@tiptap/extension-text';
import { generateHTML } from '@tiptap/react';
import { motion } from 'framer-motion';
import { BsCheck } from 'react-icons/bs';
import { TbTrash } from 'react-icons/tb';

const extensions = [Document, Paragraph, Text, HardBreak, Heading];

function ActionButton({ children }: { children: React.ReactNode; }) {
    return (
        <motion.div whileHover={{ scale: 1.2, transition: { duration: 0.3 } }}>
            <div className="cursor-pointer rounded border border-neutral-500 p-1">{children}</div>
        </motion.div>
    );
}

export default function Note({ text }: { text: string }) {
    const doc = JSON.parse(text);

    return (
        <div className="mt-5 flex justify-between rounded-lg border border-neutral-600 bg-neutral-800 bg-opacity-50 p-2 text-neutral-200">
            <div className="mb-3"
                // eslint-disable-next-line react/no-danger
                dangerouslySetInnerHTML={{ __html: generateHTML(doc, extensions) }}
            >
            </div>
            <div className="flex items-start gap-3">
                <ActionButton><BsCheck></BsCheck></ActionButton>
                <ActionButton><TbTrash></TbTrash></ActionButton>
            </div>
        </div>
    );
}
