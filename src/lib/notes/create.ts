'use server';

import { revalidatePath } from 'next/cache';
import { zact } from 'zact/server';
import { z } from 'zod';

import { getServerSession } from '../auth/session';
import prisma from '../prisma/client';
import {
    createServerActionSuccessResponse,
    createServerActionUnknownErrorResponse
} from '../server-actions';

async function createNote(userId: string, text: string, tags?: string[]) {
    await prisma.note.create({
        data: { ownerId: userId, text, tags: tags?.join(',') || '' }
    });
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
