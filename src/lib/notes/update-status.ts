'use server';

import { NoteStatus } from '@prisma/client';
import { revalidatePath } from 'next/cache';
import { zact } from 'zact/server';
import { z } from 'zod';

import { getServerSession } from '../auth/session';
import prisma from '../prisma/client';
import { createServerActionUnknownError } from '../server-actions/errors';

async function updateNoteStatus(id: string, userId: string, status: NoteStatus) {
    await prisma.note.update({
        where: { id, ownerId: userId },
        data: { status }
    });
}

export const updateNoteStatusAction = zact(z.object({
    id: z.string(), status: z.nativeEnum(NoteStatus)
}))(
    async ({ id, status }) => {
        try {
            const { user } = await getServerSession();
            await updateNoteStatus(id, user.id, status);

            revalidatePath('/pending');

            return { status: 'success' };
        } catch (error) {
            return createServerActionUnknownError();
        }
    }
);
