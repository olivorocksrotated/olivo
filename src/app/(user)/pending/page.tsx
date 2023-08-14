import { getNotes } from '@/lib/notes/get';

import Note from './components/note';

export default async function Pending() {
    const notes = await getNotes();

    return (
        <div>
            {notes.map((note) => <Note key={note.id} text={note.text}></Note>)}
        </div>
    );
}
