'use server';
import { revalidatePath } from 'next/cache';
import { zact } from 'zact/server';
import { z } from 'zod';

import { getServerSession } from '../auth/session';
import prisma from '../prisma/client';
import { createServerActionUnknownError } from '../server-actions/errors';
import {
    createServerActionSuccessResponse
} from '../server-actions/response';

async function updateNote(id: string, userId: string, text: string, tags?: string[]) {
    const data = { ownerId: userId, text };
    const where = { id, ownerId: userId };
    if (tags) {
        return prisma.note.update({
            where,
            data: {
                ...data,
                tags: {
                    connectOrCreate: tags.map((label) => (
                        {
                            create: { label, ownerId: userId },
                            where: { unique_label_id: { label, ownerId: userId } }
                        }
                    ))
                }
            }
        });
    }

    return prisma.note.update({ where, data });
}

export const updateNoteAction = zact(z.object({
    id: z.string(), text: z.string(), tags: z.array(z.string()).optional()
}))(
    async ({ id, text, tags }) => {
        try {
            const { user } = await getServerSession();
            await updateNote(id, user.id, text, tags);

            revalidatePath('/workspace');

            return createServerActionSuccessResponse();
        } catch (error) {
            return createServerActionUnknownError();
        }
    }
);
