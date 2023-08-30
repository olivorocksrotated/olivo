import { Note } from '@prisma/client';
import Link from 'next/link';

import NoteComponent from './note';

export default function Context({ tags, notes, selectedTagFilter }: { tags: string[], notes: Note[], selectedTagFilter?: string }) {
    return (
        <div>
            <div className="my-5 flex flex-wrap gap-4">
                {tags.map((tag) => (
                    <Link href={{ pathname: '/workspace', query: { selectedTagFilter: tag } }}
                        className={`cursor-pointer rounded bg-neutral-950 px-2 ${tag === selectedTagFilter ? 'border border-pink-500' : ''}}`}
                        key={tag}
                    >
                        {tag}
                    </Link>
                ))}
            </div>

            {notes.map(({ text, id }) => (
                <NoteComponent key={id} text={text} id={id} ></NoteComponent>
            ))}
        </div>
    );
}
