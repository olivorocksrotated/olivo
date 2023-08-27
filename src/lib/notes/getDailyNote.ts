import { endOfToday, startOfToday } from 'date-fns';

import { getServerSession } from '../auth/session';
import prisma from '../prisma';

const initialContent = JSON.stringify({
    type: 'doc',
    content: [
        {
            type: 'paragraph',
            content: [
                {
                    type: 'text',
                    text: `${new Date().toLocaleDateString()} Daily Note`
                }
            ]
        }
    ]
});

async function createDailyNote(userId: string, text: string, tags?: string[]) {
    return prisma.note.create({
        data: { ownerId: userId, text, tags: tags?.join(',') || '', isDailyNote: true }
    });
}

export async function getDailyNote() {
    const { user } = await getServerSession();
    const note = await prisma.note.findFirst({
        where: {
            ownerId: user.id,
            isDailyNote: true,
            createdAt: {
                gte: startOfToday().toISOString(),
                lte: endOfToday().toISOString()
            }
        }
    });

    if (note) {
        return note;
    }

    const newNote = await createDailyNote(user.id, initialContent);

    return newNote;
}
