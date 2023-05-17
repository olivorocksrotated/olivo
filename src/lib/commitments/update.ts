'use server';

import { CommitmentStatus } from '@prisma/client';
import { revalidatePath } from 'next/cache';
import { zact } from 'zact/server';
import { z } from 'zod';

import { getServerSession } from '@/lib/auth/session';

import prisma from '../prisma';

export const updateCommitmentAction = zact(z.object({
    id: z.string(),
    title: z.string().optional(),
    status: z.nativeEnum(CommitmentStatus).optional(),
    doneBy: z.string().datetime().optional()
}))(
    async (commitment) => {
        const { user } = await getServerSession();
        await prisma.commitment.update({
            where: {
                id: commitment.id,
                ownerId: user.id
            },
            data: commitment
        });

        revalidatePath('/commitments');
    }
);
