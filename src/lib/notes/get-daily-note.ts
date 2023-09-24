import prisma from '../prisma/client';
import { getDailyNoteByDate } from './get-daily-note-by-date';

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

export async function getDailyNote(userId: string) {
    const todaysNote = await getDailyNoteByDate(userId, 'today');

    return todaysNote ? todaysNote : createDailyNote(userId, initialContent);
}
