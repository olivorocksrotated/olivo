import { Note } from '@prisma/client';

import getNotesByTags from '@/lib/notes/get-notes-by-tags';

import ContextPageTitle from '../components/context-page-title';
import NoteComponent from '../dynamic/components/tags-context/note';

function Notes({ notes }: { notes: Note[] }) {
    return (
        <>
            {notes.map(({ text, id }) => (
                <div key={id} className="my-1">
                    <NoteComponent text={text} id={id}></NoteComponent>
                </div>
            ))}
        </>
    );
}

export default async function PinnedContext() {
    const notes = await getNotesByTags(['pinned']);

    return (
        <div className="overflow-scroll">
            <ContextPageTitle title="📌 Pinned Context" />
            {
                notes.length === 0 ? (
                    <div className="text-center text-neutral-500">
                        <div className="font-bold">No pinned notes found.</div>
                    </div>
                ) : <Notes notes={notes} />
            }
        </div>
    );
}
