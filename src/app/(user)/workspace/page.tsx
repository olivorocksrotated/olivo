import getNotesWithTag from '@/lib/notes/get-notes-with-tag';
import { getDailyNote } from '@/lib/notes/getDailyNote';
import { getTags } from '@/lib/notes/getTags';

import Context from './components/context/context';
import { DailyNoteEditor } from './components/dailyNoteEditor';

export default async function Workspace() {
    const note = await getDailyNote();
    const tags = await getTags();
    const notes = await getNotesWithTag(['rafa']);

    return (
        <div className="grid h-full grid-cols-2 gap-4 pr-32">
            <div className="flex flex-col rounded-lg bg-neutral-900 p-5">
                <div className="mb-5 text-xl">Daily Notes</div>
                <DailyNoteEditor note={note} tags={tags}></DailyNoteEditor>
            </div>

            <div className="rounded-lg bg-neutral-900 p-5">
                <div className="mb-5 text-xl">Context</div>
                <Context tags={tags} notes={notes}></Context>
            </div>
        </div>
    );
}