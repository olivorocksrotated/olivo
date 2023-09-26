'use client'; // TODO: remove by using only non-interactive extensions

import { generateHTML } from '@tiptap/react';

import { editorExtensions } from '../../../components/editor-extensions';

export default function Note({ text }: { text: string }) {
    const doc = JSON.parse(text);

    return (
        <div className="flex justify-between rounded-lg border border-neutral-900 bg-neutral-950 p-2 text-neutral-200">
            <div
                className="mb-3"
                // eslint-disable-next-line react/no-danger
                dangerouslySetInnerHTML={{ __html: generateHTML(doc, editorExtensions([])) }}
            >
            </div>
        </div>
    );
}
