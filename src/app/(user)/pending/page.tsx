import { getServerSession } from '@/lib/auth/session';
import { getCommitments } from '@/lib/commitments/get';
import { getNotes } from '@/lib/notes/get';
import { forceCast } from '@/lib/types/type-caster';

import { ClientCommitment, ServerCommitment } from '../commitments/types';
import Commitments from './components/commitments';
import Note from './components/note';

export default async function Pending() {
    const { user } = await getServerSession();
    const notes = await getNotes();

    const commitments = await getCommitments({
        userId: user.id,
        filters: { status: 'to-do' },
        order: { doneBy: 'asc' }
    });

    return (
        <div className="grid grid-cols-2 gap-4 pr-32">
            <div className="rounded-lg bg-neutral-900 p-5">
                <div className="text-xl">Unresolved Notes</div>
                <div>
                    {notes.map((note) => <Note key={note.id} id={note.id} text={note.text}></Note>)}
                </div>
            </div>

            <div className="rounded-lg bg-neutral-900 p-5">
                <div className="mb-5 text-xl">Pending commitments</div>
                <Commitments commitments={forceCast<ServerCommitment[], ClientCommitment[]>(commitments)} />
            </div>
        </div>
    );
}
