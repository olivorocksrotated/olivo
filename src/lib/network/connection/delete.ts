'use server';

import { zact } from 'zact/server';
import { z } from 'zod';

import { createServerActionSuccessResponse } from '@/lib/errors/server';

import { getServerSession } from '../../auth/session';
import prisma from '../../prisma';

async function deleteConnection(connectionId: string) {
    const { user } = await getServerSession();
    await prisma.networkConnection.delete({
        where: {
            OR: [
                { requesterId: user.id },
                { acceptorId: user.id }
            ],
            id: connectionId
        }
    });
}

export const deleteConnectionAction = zact(z.string())(
    async (id) => {
        await deleteConnection(id);

        return createServerActionSuccessResponse();
    }
);
