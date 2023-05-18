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
        try {
            const { user } = await getServerSession();
            const acceptorUser = await prisma.user.findUnique({ where: { email: userEmail } });
            if (!acceptorUser) {
                throw new Error('The email does not belong to an existing user');
            }
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
