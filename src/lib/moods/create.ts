'use server';

import { MoodStatus } from '@prisma/client';
import { revalidatePath } from 'next/cache';
import { z } from 'zod';

import { getServerSession } from '../auth/session';
import prisma from '../prisma/client';
import { action } from '../server-actions/safe-action-client';

export const createMoodAction = action(z.object({
    status: z.nativeEnum(MoodStatus),
    comment: z.string().optional()
}), async (mood) => {
    const { user } = await getServerSession();
    const createdMood = await prisma.mood.create({
        data: {
            ownerId: user.id,
            ...mood
        }
    });

    revalidatePath('/moods');

    return createdMood.id;
});
