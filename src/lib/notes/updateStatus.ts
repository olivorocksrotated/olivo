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

            return createServerActionSuccessResponse();
        } catch (error) {
            return createServerActionUnknownErrorResponse();
        }
    }
);
