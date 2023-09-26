import Link from 'next/link';
import { ParsedUrlQuery } from 'querystring';

import getNotesByTags, { FilterOption } from '@/lib/notes/get-notes-by-tags';
import { getTags } from '@/lib/tags/get';

import ContextPageTitle from '../components/context-page-title';
import NoteComponent from './components/tags-context/note';
import { FilterSelect } from './components/tags-context/tag-filter-select';
import TagsSelector from './components/tags-context/tags-selector';

function buildQueryWithTag(tag: string, selectedTagsFilter?: string[]) {
    return selectedTagsFilter?.length ? { selectedTagsFilter: [...selectedTagsFilter, tag].join(',') } : { selectedTagsFilter: tag };
}

function buildQueryWithoutTag(tag: string, selectedTagsFilter?: string[]) {
    return selectedTagsFilter?.length ? { selectedTagsFilter: selectedTagsFilter.filter((filteredTag) => tag !== filteredTag).join(',') } : {};
}

const fixedTags = [{ label: 'Pinned', value: 'pinned' }];
const fixedTagValues = fixedTags.map(({ value }) => value);

function TagLink({ tag, query, isSelected }: { tag: string, query: ParsedUrlQuery, isSelected: boolean }) {
    return (
        <Link
            href={{ query }}
            className={`cursor-pointer rounded border border-neutral-800 bg-neutral-950 px-2 ${isSelected ? ' border-red-400 ' : ''}`}
        >
            {tag}
        </Link>
    );
}

type PageProps = {
    searchParams: { selectedTagsFilter?: string, operator?: FilterOption }
};

export default async function TagsContext({ searchParams: { selectedTagsFilter, operator } }: PageProps) {
    const tags = await getTags();
    const tagLabels = tags.map(({ label }) => label);
    const tagFilter = selectedTagsFilter ? selectedTagsFilter.split(',') : undefined;
    const notes = await getNotesByTags(tagFilter || [], operator);

    const isSelected = (tag: string) => selectedTagsFilter?.includes(tag) || false;

    function buildQuery(tag: string) {
        const queryBuilder = isSelected(tag) ? buildQueryWithoutTag : buildQueryWithTag;

        return {
            ...queryBuilder(tag, tagFilter),
            operator: operator ? operator : FilterOption.Intersection
        };
    }

    function renderTag({ value, label }: { value: string, label: string }) {
        return <TagLink key={value} tag={label} query={buildQuery(value)} isSelected={isSelected(value)} />;
    }

    function mapTagsToOptions(tagValues: string[]) {
        return tagValues.reduce((tagsSofar, tag) => {
            if (!fixedTagValues.includes(tag)) {
                return [...tagsSofar, { value: tag, label: tag }];
            }

            return tagsSofar;
        }, [] as { value: string, label: string }[]);
    }

    const dynamicTags = mapTagsToOptions(tagLabels);
    const selectedDynamicTags = tagFilter ? mapTagsToOptions(tagFilter) : null;

    return (
        <>
            <ContextPageTitle title="Tags" />
            <div className="flex flex-col gap-2 md:flex-row md:items-center">
                <FilterSelect defaultValue={operator}></FilterSelect>
                <TagsSelector options={dynamicTags} selectedValues={tagFilter ?? []}></TagsSelector>
            </div>
            <div className="my-5 flex flex-wrap gap-4">
                {fixedTags.map(renderTag)}
                {selectedDynamicTags?.map(renderTag)}
            </div>

            {
                notes.length === 0 ? (
                    <div className="text-center text-neutral-500">
                        <div className="font-bold">No notes found.</div>
                        {operator === FilterOption.Intersection ? <div> Try removing some tags or using the Union operator </div> : null}
                    </div>
                ) : null
            }

            {notes.map(({ text, id }) => (
                <div key={id} className="my-1">
                    <NoteComponent text={text} id={id}></NoteComponent>
                </div>
            ))}
        </>
    );
}
