'use server';

import { revalidatePath } from 'next/cache';
import { zact } from 'zact/server';
import { z } from 'zod';

import { createServerActionSuccessResponse } from '@/lib/server-actions/response';

import { getServerSession } from '../../auth/session';
import prisma from '../../prisma/client';

export async function updateConnectionState(connectionId: string, newActiveState: boolean) {
    const { user } = await getServerSession();
    await prisma.networkConnection.update({
        where: {
            OR: [
                { requesterId: user.id },
                { acceptorId: user.id }
            ],
            id: connectionId
        },
        data: { active: newActiveState }
    });
}

export const updateConnectionStateAction = zact(z.object({ id: z.string(), newActiveState: z.boolean() }))(
    async ({ id, newActiveState }) => {
        await updateConnectionState(id, newActiveState);
        revalidatePath('/network');
        revalidatePath('/network/[id]');

        return createServerActionSuccessResponse();
    }
);