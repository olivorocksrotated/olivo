import { Note } from '@prisma/client';
import Link from 'next/link';
import { ParsedUrlQuery } from 'querystring';

import { FilterOption } from '@/lib/notes/get-notes-by-tags';

import NoteComponent from './components/note';
import { FilterSelect } from './components/tag-filter-select';
import TagsSelector from './components/tags-selector';

function buildQueryWithTag(tag: string, selectedTagsFilter?: string[]) {
    return selectedTagsFilter?.length ? { selectedTagsFilter: [...selectedTagsFilter, tag].join(',') } : { selectedTagsFilter: tag };
}

function buildQueryWithoutTag(tag: string, selectedTagsFilter?: string[]) {
    return selectedTagsFilter?.length ? { selectedTagsFilter: selectedTagsFilter.filter((filteredTag) => tag !== filteredTag).join(',') } : {};
}

type ContextProps = { tags: string[], notes: Note[], selectedTagsFilter?: string[], selectedOperator?: FilterOption };

const fixedTags = [{ label: 'Pinned', value: 'pinned' }];
const fixedTagValues = fixedTags.map(({ value }) => value);

function TagLink({ tag, query, isSelected }: { tag: string, query: ParsedUrlQuery, isSelected: boolean }) {
    return (
        <Link href={{ query }}
            className={`cursor-pointer rounded border border-neutral-800 bg-neutral-950 px-2 ${isSelected ? ' border-red-400 ' : ''}`}
        >
            {tag}
        </Link>
    );
}

export default function Context({ tags, notes, selectedTagsFilter, selectedOperator }: ContextProps) {
    const isSelected = (tag: string) => selectedTagsFilter?.includes(tag) || false;

    function buildQuery(tag: string) {
        const queryBuilder = isSelected(tag) ? buildQueryWithoutTag : buildQueryWithTag;

        return {
            ...queryBuilder(tag, selectedTagsFilter),
            operator: selectedOperator ? selectedOperator : FilterOption.Intersection
        };
    }

    function renderTag({ value, label }: { value: string, label: string }) {
        return <TagLink key={value} tag={label} query={buildQuery(value)} isSelected={isSelected(value)} />;
    }

    const dynamicTags = tags.reduce((tagsSofar, tag) => {
        if (!fixedTagValues.includes(tag) && !isSelected(tag)) {
            return [...tagsSofar, { value: tag, label: tag }];
        }

        return tagsSofar;
    }, [] as { value: string, label: string }[]);

    const selectedDynamicTags = selectedTagsFilter?.reduce((tagsSofar, tag) => {
        if (!fixedTagValues.includes(tag)) {
            return [...tagsSofar, { value: tag, label: tag }];
        }

        return tagsSofar;
    }, [] as { value: string, label: string }[]);

    return (
        <div className="overflow-scroll">
            <div className="flex items-center">
                <FilterSelect defaultValue={selectedOperator}></FilterSelect>
                <TagsSelector options={dynamicTags}></TagsSelector>
            </div>
            <div className="my-5 flex flex-wrap gap-4">
                {fixedTags.map(renderTag)}
                {selectedDynamicTags?.map(renderTag)}
            </div>

            {notes.map(({ text, id }) => (
                <div key={id} className="my-1">
                    <NoteComponent text={text} id={id}></NoteComponent>
                </div>
            ))}
        </div>
    );
}
