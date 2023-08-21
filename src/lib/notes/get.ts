import { NoteStatus } from '@prisma/client';

import { getServerSession } from '../auth/session';
import prisma from '../prisma';

export async function getNotes() {
    const { user } = await getServerSession();
    const notes = await prisma.note.findMany({
        where: { ownerId: user.id, status: NoteStatus.Unresolved }
    });

    return notes;
}
