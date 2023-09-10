'use server';

import { revalidatePath } from 'next/cache';
import { zact } from 'zact/server';
import { z } from 'zod';

import { getServerSession } from '../auth/session';
import prisma from '../prisma/client';
import { stringToJSON } from '../validators/string-to-json';

export const createCommitmentAction = zact(z.object({
    title: z.string(),
    doneBy: z.string().datetime(),
    description: stringToJSON.optional()
}))(
    async ({ title, doneBy, description }) => {
        const { user } = await getServerSession();
        const createdCommitment = await prisma.commitment.create({
            data: {
                ownerId: user.id,
                title,
                doneBy,
                ...!description ? {} : { description }
            }
        });

        revalidatePath('/commitments');

        return createdCommitment.id;
    }
);
