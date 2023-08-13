'use server';

import { zact } from 'zact/server';
import { z } from 'zod';

import { getServerSession } from '../auth/session';
import prisma from '../prisma';
import {
    createServerActionSuccessResponse,
    createServerActionUnknownErrorResponse
} from '../server-actions';

async function createNote(text: string, tags?: string[]) {
    const { user } = await getServerSession();

    await prisma.note.create({
        data: { ownerId: user.id, text, tags: tags?.join(',') || '' }
    });
}

export const createNoteAction = zact(z.object({
    text: z.string(), tags: z.array(z.string()).optional()
}))(
    async ({ text, tags }) => {
        try {
            await createNote(text, tags);

            return createServerActionSuccessResponse();
        } catch (error) {
            return createServerActionUnknownErrorResponse();
        }
    }
);
