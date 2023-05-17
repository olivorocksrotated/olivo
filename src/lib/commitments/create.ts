'use server';

import { revalidatePath } from 'next/cache';
import { zact } from 'zact/server';
import { z } from 'zod';

import { getServerSession } from '../auth/session';
import prisma from '../prisma';

export const createCommitmentAction = zact(z.object({
    title: z.string(),
    doneBy: z.string().datetime()
}))(
    async (commitment) => {
        const { user } = await getServerSession();
        const createdCommitment = await prisma.commitment.create({
            data: {
                ownerId: user.id,
                ...commitment
            }
        });

        revalidatePath('/commitments');

        return createdCommitment.id;
    }
);
