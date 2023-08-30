'use client';
import { Note } from '@prisma/client';
import { useState } from 'react';

import NoteComponent from './note';

export default function Context({ tags, notes }: { tags: string[], notes: Note[] }) {
    /* eslint-disable @typescript-eslint/no-unused-vars */
    const [selectedTag, setSelectedTag] = useState<string>('');

    return (
        <div>
            <div className="my-5 flex flex-wrap gap-4">
                {tags.map((tag) => (
                    <div className="cursor-pointer rounded bg-neutral-950 px-2" key={tag} onClick={() => setSelectedTag(tag)}>{tag}</div>
                ))}
            </div>

            {notes.map(({ text, id }) => (
                <NoteComponent key={id} text={text} id={id} ></NoteComponent>
            ))}
        </div>
    );
}
