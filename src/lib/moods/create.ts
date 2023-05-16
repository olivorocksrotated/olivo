'use server';

import { MoodStatus } from '@prisma/client';
import { revalidatePath } from 'next/cache';
import { zact } from 'zact/server';
import { z } from 'zod';

import { getServerSession } from '../auth/session';
import prisma from '../prisma';

export const createMoodAction = zact(z.object({
    status: z.nativeEnum(MoodStatus),
    comment: z.string().optional()
}))(
    async (mood) => {
        const { user } = await getServerSession();
        const createdMood = await prisma.mood.create({
            data: {
                ownerId: user.id,
                ...mood
            }
        });

        revalidatePath('/moods');

        return createdMood.id;
    }
);
