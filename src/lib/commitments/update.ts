'use server';

import { CommitmentStatus } from '@prisma/client';
import { revalidatePath } from 'next/cache';
import { zact } from 'zact/server';
import { z } from 'zod';

import { getServerSession } from '@/lib/auth/session';

import prisma from '../prisma/client';
import { stringToJSON } from '../validators/string-to-json';

export const updateCommitmentAction = zact(z.object({
    id: z.string(),
    title: z.string().optional(),
    status: z.nativeEnum(CommitmentStatus).optional(),
    doneBy: z.string().datetime().optional(),
    doneAt: z.string().datetime().nullable().optional(),
    description: stringToJSON.optional()
}))(
    async ({ id, title, status, doneBy, doneAt, description }) => {
        const { user } = await getServerSession();
        await prisma.commitment.update({
            where: { id, ownerId: user.id },
            data: {
                title,
                status,
                doneBy,
                doneAt,
                ...!description ? {} : { description }
            }
        });

        revalidatePath('/commitments');
    }
);
