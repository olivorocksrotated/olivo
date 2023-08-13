import { getNotes } from '@/lib/notes/get';

export default async function Pending() {
    const notes = await getNotes();

    return (
        <div>
            {notes.map((note) => <div key={note.id}>{note.text}</div>)}
        </div>
    );
}
