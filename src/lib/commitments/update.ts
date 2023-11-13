'use server';

import { CommitmentStatus } from '@prisma/client';
import { revalidatePath } from 'next/cache';
import { z } from 'zod';

import { getServerSession } from '@/lib/auth/session';

import prisma from '../prisma/client';
import { action } from '../server-actions/safe-action-client';
import { stringToJSON } from '../validators/string-to-json';

const updateValidator = z.object({
    id: z.string(),
    title: z.string().optional(),
    status: z.nativeEnum(CommitmentStatus).optional(),
    doneBy: z.string().datetime().optional(),
    doneAt: z.string().datetime().nullable().optional(),
    description: stringToJSON.optional()
});

export async function updateCommitment({ userId, id, title, status, doneBy, doneAt, description }: {
    userId: string
} & z.infer<typeof updateValidator>) {
    return prisma.commitment.update({
        where: { id, ownerId: userId },
        data: {
            title,
            status,
            doneBy,
            doneAt,
            ...!description ? {} : { description }
        }
    });
}

export const updateCommitmentAction = action(updateValidator, async ({ id, title, status, doneBy, doneAt, description }) => {
    const { user } = await getServerSession();
    await updateCommitment({ userId: user.id, id, title, status, doneBy, doneAt, description });

    revalidatePath('/commitments');
});
