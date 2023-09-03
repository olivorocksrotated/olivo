import { getDailyNote } from '@/lib/notes/get-daily-note';
import getNotesByTags from '@/lib/notes/get-notes-by-tags';
import { getTags } from '@/lib/tags/get';

import Context from './components/context/context';
import { DailyNoteEditor } from './components/daily-note-editor/daily-note-editor';

export default async function Workspace({ searchParams }: { searchParams: { selectedTagsFilter?: string } }) {
    const note = await getDailyNote();
    const tags = await getTags();
    const tagLabels = tags.map(({ label }) => label);
    const tagFilter = searchParams.selectedTagsFilter ? searchParams.selectedTagsFilter.split(',') : undefined;
    const notes = await getNotesByTags(tagFilter || []);

    return (
        <div className="grid h-full grid-cols-2 gap-4 pr-32">
            <div className="flex flex-col rounded-lg bg-neutral-900 p-5">
                <div className="mb-5 text-xl">Daily Notes</div>
                <DailyNoteEditor note={note} tags={tagLabels}></DailyNoteEditor>
            </div>

            <div className="rounded-lg bg-neutral-900 p-5">
                <div className="mb-5 text-xl">Context</div>
                <Context selectedTagsFilter={tagFilter} tags={tagLabels} notes={notes}></Context>
            </div>
        </div>
    );
}
