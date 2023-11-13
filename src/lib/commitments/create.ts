'use server';

import { revalidatePath } from 'next/cache';
import { z } from 'zod';

import { getServerSession } from '../auth/session';
import prisma from '../prisma/client';
import { action } from '../server-actions/safe-action-client';
import { stringToJSON } from '../validators/string-to-json';

const createValidator = z.object({
    title: z.string(),
    doneBy: z.string().datetime(),
    description: stringToJSON.optional()
});

export async function createCommitment({ userId, title, doneBy, description }: {
    userId: string
} & z.infer<typeof createValidator>) {
    return prisma.commitment.create({
        data: {
            ownerId: userId,
            title,
            doneBy,
            ...!description ? {} : { description }
        }
    });
}

export const createCommitmentAction = action(createValidator, async ({ title, doneBy, description }) => {
    const { user } = await getServerSession();
    const createdCommitment = await createCommitment({ userId: user.id, title, doneBy, description });

    revalidatePath('/commitments');

    return createdCommitment.id;
});
