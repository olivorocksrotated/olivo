'use server';

import { revalidatePath } from 'next/cache';
import { zact } from 'zact/server';
import { z } from 'zod';

import { getServerSession } from '../auth/session';
import prisma, { hasUniqueContraintFailed } from '../prisma';

export const createConnectionAction = zact(z.object({
    userEmail: z.string()
}))(
    async ({ userEmail }) => {
        const { user } = await getServerSession();

        if (user.email === userEmail) {
            throw new Error('It is not possible to create a connection with yourself');
        }
        const acceptorUser = await prisma.user.findUnique({ where: { email: userEmail } });
        if (!acceptorUser) {
            throw new Error('The email does not belong to an existing user');
        }
        try {
            await prisma.networkConnection.create({
                data: { requesterId: user.id, acceptorId: acceptorUser.id }
            });
        } catch (error) {
            if (hasUniqueContraintFailed(error)) {
                throw new Error('The user is already in your network');
            }
            throw error;
        }

        revalidatePath('/network');
    }
);