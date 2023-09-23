import { getServerSession } from '@/lib/auth/session';
import { getDailyNoteByDate } from '@/lib/notes/get-daily-note-by-date';

import NoteComponent from './components/note';

export default async function YesterdayContext() {
    const { user } = await getServerSession();
    const note = await getDailyNoteByDate(user.id, 'yesterday');

    if (!note) {
        return <div className="text-center text-gray-400">No note for yesterday</div>;
    }

    return (
        <div>
            <div className="mb-3 text-2xl">Yesterdays Note</div>
            <NoteComponent text={note.text}></NoteComponent>
        </div>
    );
}
