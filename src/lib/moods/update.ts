'use server';

import { MoodStatus } from '@prisma/client';
import { zact } from 'zact/server';
import { z } from 'zod';

import { getServerSession } from '../auth/session';
import prisma from '../prisma';

export const updateMoodAction = zact(z.object({
    id: z.string(),
    status: z.nativeEnum(MoodStatus).optional(),
    comment: z.string().optional()
}))(
    async (mood) => {
        const { user } = await getServerSession();
        const { id, ...update } = mood;
        const updatedMood = await prisma.mood.update({
            where: {
                id,
                ownerId: user.id
            },
            data: update
        });

        return updatedMood.id;
    }
);
