'use server';

import { NoteStatus } from '@prisma/client';
import { revalidatePath } from 'next/cache';
import { zact } from 'zact/server';
import { z } from 'zod';

import { getServerSession } from '../auth/session';
import prisma from '../prisma';
import {
    createServerActionSuccessResponse,
    createServerActionUnknownErrorResponse
} from '../server-actions';

async function archiveNote(id: string, userId: string) {
    await prisma.note.update({
        where: { id, ownerId: userId },
        data: { status: NoteStatus.Archived }
    });
}

export const archiveNoteAction = zact(z.object({
    id: z.string()
}))(
    async ({ id }) => {
        try {
            const { user } = await getServerSession();
            await archiveNote(id, user.id);

            revalidatePath('/pending');

            return createServerActionSuccessResponse();
        } catch (error) {
            return createServerActionUnknownErrorResponse();
        }
    }
);
