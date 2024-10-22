'use server';

import { MoodStatus } from '@prisma/client';
import { revalidatePath } from 'next/cache';
import { z } from 'zod';

import { getServerSession } from '../auth/session';
import prisma from '../prisma/client';
import { action } from '../server-actions/safe-action-client';

export const updateMoodAction = action(z.object({
    id: z.string(),
    status: z.nativeEnum(MoodStatus).optional(),
    comment: z.string().optional()
}), async (mood) => {
    const { user } = await getServerSession();
    const { id, ...update } = mood;
    const updatedMood = await prisma.mood.update({
        where: {
            id,
            ownerId: user.id
        },
        data: update
    });

    revalidatePath('/moods');

    return updatedMood.id;
});
