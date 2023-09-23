import { endOfToday, endOfYesterday, startOfToday, startOfYesterday } from 'date-fns';

import prisma from '../prisma/client';

const createdAtGettersMap = {
    yesterday: {
        start: startOfYesterday,
        end: endOfYesterday
    },
    today: {
        start: startOfToday,
        end: endOfToday
    }
};

export async function getDailyNoteByDate(ownerId: string, date: 'yesterday' | 'today') {
    const { start, end } = createdAtGettersMap[date];

    return prisma.note.findFirst({
        where: {
            ownerId,
            isDailyNote: true,
            createdAt: {
                gte: start().toISOString(),
                lte: end().toISOString()
            }
        }
    });
}
