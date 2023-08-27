import { getServerSession } from '../auth/session';
import prisma from '../prisma';

const initialContent = '# Today\'s daily note';

async function createNote(userId: string, text: string, tags?: string[]) {
    return prisma.note.create({
        data: { ownerId: userId, text, tags: tags?.join(',') || '' }
    });
}

export async function getDailyNote() {
    const { user } = await getServerSession();
    const note = await prisma.note.findFirst({
        where: { ownerId: user.id }
    });

    if (note) {
        return note;
    }

    const newNote = await createNote(user.id, initialContent);

    return newNote;
}
