import { getNotes } from '@/lib/notes/get';

import Note from './components/note';

export default async function Pending() {
    const notes = await getNotes();

    return (
        <div className="grid grid-cols-3">
            <div className="rounded-lg bg-neutral-900 p-5">
                <div className="text-xl">Notes</div>
                <div>
                    {notes.map((note) => <Note key={note.id} text={note.text}></Note>)}
                </div>
            </div>
        </div>
    );
}
