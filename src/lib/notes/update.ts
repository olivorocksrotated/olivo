'use server';
import { zact } from 'zact/server';
import { z } from 'zod';

import { getServerSession } from '../auth/session';
import prisma from '../prisma';
import {
    createServerActionSuccessResponse,
    createServerActionUnknownErrorResponse
} from '../server-actions';

async function updateNote(id: string, userId: string, text: string) {
    await prisma.note.update({
        where: { id, ownerId: userId },
        data: { text }
    });
}

export const updateNoteAction = zact(z.object({
    id: z.string(), text: z.string()
}))(
    async ({ id, text }) => {
        try {
            const { user } = await getServerSession();
            await updateNote(id, user.id, text);

            return createServerActionSuccessResponse();
        } catch (error) {
            return createServerActionUnknownErrorResponse();
        }
    }
);
