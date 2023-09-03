'use server';

import { revalidatePath } from 'next/cache';
import { zact } from 'zact/server';
import { z } from 'zod';

import { getServerSession } from '../auth/session';
import prisma from '../prisma/client';
import {
    createServerActionSuccessResponse,
    createServerActionUnknownErrorResponse
} from '../server-actions/response';

async function createNote(userId: string, text: string, tags?: string[]) {
    const data = {
        ownerId: userId,
        text
    };
    if (tags) {
        return prisma.note.create({
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

    return prisma.note.create({ data });
}

export const createNoteAction = zact(z.object({
    text: z.string(), tags: z.array(z.string()).optional()
}))(
    async ({ text, tags }) => {
        try {
            const { user } = await getServerSession();
            await createNote(user.id, text, tags);

            revalidatePath('/pending');

            return createServerActionSuccessResponse();
        } catch (error) {
            return createServerActionUnknownErrorResponse();
        }
    }
);
