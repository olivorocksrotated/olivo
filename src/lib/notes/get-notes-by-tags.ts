import { NoteStatus } from '@prisma/client';

import { getServerSession } from '../auth/session';
import prisma from '../prisma';

enum TagsSearchOperator {
    Every = 'every',
    Some = 'some'
}

export default async function getNotesByTags(tags: string[], operator: TagsSearchOperator = TagsSearchOperator.Every) {
    const { user } = await getServerSession();

    return prisma.note.findMany({
        where: {
            ownerId: user.id,
            isDailyNote: false,
            status: NoteStatus.Unresolved,
            tags: {
                [operator]: { label: { in: tags }, ownerId: user.id }
            }
        }
    });
}
