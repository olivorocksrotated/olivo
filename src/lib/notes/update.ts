'use server';
import { revalidatePath } from 'next/cache';
import { zact } from 'zact/server';
import { z } from 'zod';

import { getServerSession } from '../auth/session';
import prisma from '../prisma';
import {
    createServerActionSuccessResponse,
    createServerActionUnknownErrorResponse
} from '../server-actions';

async function updateNote(id: string, userId: string, text: string, tags?: string[]) {
    await prisma.note.update({
        where: { id, ownerId: userId },
        data: { text, tags: tags?.join(',') || '' }
    });
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
            return createServerActionUnknownErrorResponse();
        }
    }
);
