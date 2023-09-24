import { getServerSession } from '@/lib/auth/session';
import { getDailyNoteByDate } from '@/lib/notes/get-daily-note-by-date';

import ContextPageTitle from '../components/context-page-title';
import NoteComponent from './components/note';

function NoNoteMessage() {
    return (
        <div className="text-center text-neutral-500">
            <div className="font-bold">No daily note found.</div>
        </div>
    );
}

export default async function YesterdayContext() {
    const { user } = await getServerSession();
    const note = await getDailyNoteByDate(user.id, 'yesterday');

    return (
        <>
            <ContextPageTitle title="Yesterday's Note" />
            {
                note ? <NoteComponent text={note.text} /> : <NoNoteMessage />
            }
        </>
    );
}
