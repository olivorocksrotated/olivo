'use client';
import { Note } from '@prisma/client';
import { useState } from 'react';

import NoteComponent from './note';

export default function Context({ tags, notes }: { tags: string[], notes: Note[] }) {
    /* eslint-disable @typescript-eslint/no-unused-vars */
    const [selectedTag, setSelectedTag] = useState<string>('');

    return (
        <div>
            {tags.map((tag) => (
                <div key={tag} onClick={() => setSelectedTag(tag)}>Tag {tag}</div>
            ))}
            {notes.map(({ text, id }) => (
                <NoteComponent key={id} text={text} id={id} ></NoteComponent>
            ))}
        </div>
    );
}
