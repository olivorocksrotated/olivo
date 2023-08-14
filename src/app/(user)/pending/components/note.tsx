'use client';

import Document from '@tiptap/extension-document';
import HardBreak from '@tiptap/extension-hard-break';
import Paragraph from '@tiptap/extension-paragraph';
import Text from '@tiptap/extension-text';
import { generateHTML } from '@tiptap/react';

export default function Note({ text }: { text: string }) {
    const doc = JSON.parse(text);

    return (
        <div className="mt-5 flex rounded-lg border border-[#ff6363] bg-pink-900 bg-opacity-50 p-2 text-neutral-200"
            // eslint-disable-next-line react/no-danger
            dangerouslySetInnerHTML={{ __html: generateHTML(doc, [Document, Paragraph, Text, HardBreak]) }}
        >
        </div>
    );
}
