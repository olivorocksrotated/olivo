import { NoteStatus } from '@prisma/client';

import { getServerSession } from '../auth/session';
import prisma from '../prisma';

enum FilterOption {
    Intersection = 'AND',
    Union = 'OR'
}

export default async function getNotesByTags(tags: string[], operator: FilterOption = FilterOption.Intersection) {
    const { user } = await getServerSession();

    return prisma.note.findMany({
        where: {
            ownerId: user.id,
            isDailyNote: false,
            status: NoteStatus.Unresolved,
            [operator]: tags.map((label) => ({ tags: { some: { label, ownerId: user.id } } }))
        }
    });
}
