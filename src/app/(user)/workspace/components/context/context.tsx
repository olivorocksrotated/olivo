import { Note } from '@prisma/client';
import Link from 'next/link';

import NoteComponent from './note';

function buildQueryWithTag(tag: string, selectedTagsFilter?: string[]) {
    return selectedTagsFilter?.length ? { selectedTagsFilter: [...selectedTagsFilter, tag].join(',') } : { selectedTagsFilter: tag };
}

function buildQueryWithoutTag(tag: string, selectedTagsFilter?: string[]) {
    return selectedTagsFilter?.length ? { selectedTagsFilter: selectedTagsFilter.filter((filteredTag) => tag !== filteredTag).join(',') } : {};
}

export default function Context({ tags, notes, selectedTagsFilter }: { tags: string[], notes: Note[], selectedTagsFilter?: string[] }) {
    const isSelected = (tag: string) => selectedTagsFilter?.includes(tag) || false;

    return (
        <div>
            <div className="my-5 flex flex-wrap gap-4">
                {tags.map((tag) => (
                    <Link href={{
                        pathname: '/workspace',
                        query: isSelected(tag) ? buildQueryWithoutTag(tag, selectedTagsFilter) : buildQueryWithTag(tag, selectedTagsFilter)
                    }}
                    className={`cursor-pointer rounded border border-neutral-800 bg-neutral-950 px-2 ${isSelected(tag) ? ' border-red-400 ' : ''}}`}
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
