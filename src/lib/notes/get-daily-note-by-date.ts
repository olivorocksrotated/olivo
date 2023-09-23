import { endOfYesterday, startOfYesterday } from 'date-fns';

import prisma from '../prisma/client';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export async function getDailyNoteByDate(ownerId: string, _date: 'yesterday') {
    return prisma.note.findFirst({
        where: {
            ownerId,
            isDailyNote: true,
            createdAt: {
                gte: startOfYesterday().toISOString(),
                lte: endOfYesterday().toISOString()
            }
        }
    });
}
