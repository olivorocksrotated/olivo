import { getDailyNote } from '@/lib/notes/getDailyNote';

import { DailyNoteEditor } from './components/dailyNoteEditor';

export default async function Workspace() {
    const note = await getDailyNote();

    return (
        <div className="grid h-full grid-cols-2 gap-4 pr-32">
            <div className="flex flex-col rounded-lg bg-neutral-900 p-5">
                <div className="mb-5 text-xl">Daily Notes</div>
                <DailyNoteEditor note={note}></DailyNoteEditor>
            </div>

            <div className="rounded-lg bg-neutral-900 p-5">
                <div className="mb-5 text-xl">Tags</div>
            </div>
        </div>
    );
}
