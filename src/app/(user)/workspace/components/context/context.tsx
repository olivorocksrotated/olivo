import { Note } from '@prisma/client';
import Link from 'next/link';

import { FilterOption } from '@/lib/notes/get-notes-by-tags';

import NoteComponent from './components/note';
import { FilterSelect } from './components/tag-filter-select';

function buildQueryWithTag(tag: string, selectedTagsFilter?: string[]) {
    return selectedTagsFilter?.length ? { selectedTagsFilter: [...selectedTagsFilter, tag].join(',') } : { selectedTagsFilter: tag };
}

function buildQueryWithoutTag(tag: string, selectedTagsFilter?: string[]) {
    return selectedTagsFilter?.length ? { selectedTagsFilter: selectedTagsFilter.filter((filteredTag) => tag !== filteredTag).join(',') } : {};
}

type ContextProps = { tags: string[], notes: Note[], selectedTagsFilter?: string[], selectedOperator?: FilterOption };

export default function Context({ tags, notes, selectedTagsFilter, selectedOperator }: ContextProps) {
    const isSelected = (tag: string) => selectedTagsFilter?.includes(tag) || false;

    function buildQuery(tag: string) {
        const queryBuilder = isSelected(tag) ? buildQueryWithoutTag : buildQueryWithTag;

        return {
            ...queryBuilder(tag, selectedTagsFilter),
            operator: selectedOperator ? selectedOperator : FilterOption.Intersection
        };
    }

    return (
        <div className="overflow-scroll">
            <div className="my-5 flex flex-wrap gap-4">
                <FilterSelect></FilterSelect>
                {tags.map((tag) => (
                    <Link href={{
                        pathname: '/workspace',
                        query: buildQuery(tag)
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
