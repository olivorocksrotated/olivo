import { endOfToday, startOfToday } from 'date-fns';

import { getServerSession } from '../auth/session';
import prisma from '../prisma/client';

const initialContent = JSON.stringify({
    type: 'doc',
    content: [
        {
            type: 'heading',
            attrs: { level: 4 },
            content: [
                {
                    type: 'text',
                    text: `${new Date().toLocaleDateString()} Daily Note`,
                    tags: []
                }
            ]
        }
    ]
});

async function createDailyNote(userId: string, text: string) {
    return prisma.note.create({
        data: { ownerId: userId, text, isDailyNote: true }
    });
}

async function getTodaysNote(ownerId: string) {
    return prisma.note.findFirst({
        where: {
            ownerId,
            isDailyNote: true,
            createdAt: {
                gte: startOfToday().toISOString(),
                lte: endOfToday().toISOString()
            }
        }
    });
}

export async function getDailyNote() {
    const { user } = await getServerSession();
    const todaysNote = await getTodaysNote(user.id);

    if (todaysNote) {
        return todaysNote;
    }

    const newNote = await createDailyNote(user.id, initialContent);

    return newNote;
}
