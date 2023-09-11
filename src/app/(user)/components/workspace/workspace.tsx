import { getDailyNote } from '@/lib/notes/get-daily-note';
import getNotesByTags, { FilterOption } from '@/lib/notes/get-notes-by-tags';
import { getTags } from '@/lib/tags/get';

import Context from './components/context/context';
import { DailyNoteEditor } from './components/daily-note-editor/daily-note-editor';

function Section({ children }: { children: React.ReactNode }) {
    return (
        <div className="flex max-h-full flex-col overflow-hidden rounded-lg bg-neutral-900 p-5">
            {children}
        </div>
    );
}

export default async function Workspace({ searchParams }: { searchParams: { selectedTagsFilter?: string, operator?: FilterOption } }) {
    const note = await getDailyNote();
    const tags = await getTags();
    const tagLabels = tags.map(({ label }) => label);
    const tagFilter = searchParams.selectedTagsFilter ? searchParams.selectedTagsFilter.split(',') : undefined;
    const notes = await getNotesByTags(tagFilter || [], searchParams.operator);

    return (
        <>
            <Section>
                <div className="mb-5 text-xl">Daily Note</div>
                <DailyNoteEditor note={note} tags={tagLabels}></DailyNoteEditor>
            </Section>

            <Section>
                <div className="mb-5 text-xl">Context</div>
                <Context selectedOperator={searchParams.operator} selectedTagsFilter={tagFilter} tags={tagLabels} notes={notes}></Context>
            </Section>
        </>
    );
}
