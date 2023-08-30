import { getServerSession } from '../auth/session';
import prisma from '../prisma';

export default async function getNotesWithTag(tags: string[]) {
    const { user } = await getServerSession();

    return prisma.note.findMany({
        where: {
            ownerId: user.id,
            isDailyNote: false,
            tags: tags.join(',')
        }
    });
}
