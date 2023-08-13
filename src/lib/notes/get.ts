import { getServerSession } from '../auth/session';
import prisma from '../prisma';

export async function getNotes() {
    const { user } = await getServerSession();
    const notes = await prisma.note.findMany({
        where: { ownerId: user.id }
    });

    return notes;
}
