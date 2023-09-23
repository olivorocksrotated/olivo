import { getServerSession } from '@/lib/auth/session';
import { getDailyNote } from '@/lib/notes/get-daily-note';
import { getTags } from '@/lib/tags/get';

import { DailyNoteEditor } from './components/daily-note-editor/daily-note-editor';

export default async function DailyNotes() {
    const { user } = await getServerSession();
    const note = await getDailyNote(user.id);
    const tags = await getTags();
    const tagLabels = tags.map(({ label }) => label);

    return (
        <>
            <div className="mb-5 text-xl">Daily Note</div>
            <DailyNoteEditor note={note} tags={tagLabels}></DailyNoteEditor>
        </>
    );
}
