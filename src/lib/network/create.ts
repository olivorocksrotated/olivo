'use server';

import { revalidatePath } from 'next/cache';
import { zact } from 'zact/server';
import { z } from 'zod';

import { getServerSession } from '../auth/session';
import prisma, { hasUniqueContraintFailed } from '../prisma';

const unknownServerError = { status: 'error', error: 'Unknown Server Error' };

export const createConnectionAction = zact(z.object({
    userEmail: z.string()
}))(
    async ({ userEmail }) => {
        try {
            const { user } = await getServerSession();

            if (user.email === userEmail) {
                return { status: 'error', error: 'It is not possible to create a connection with yourself' };
            }
            const acceptorUser = await prisma.user.findUnique({ where: { email: userEmail } });
            if (!acceptorUser) {
                return { status: 'error', error: 'The email does not belong to an existing user' };
            }
            try {
                await prisma.networkConnection.create({
                    data: { requesterId: user.id, acceptorId: acceptorUser.id }
                });
            } catch (error) {
                if (hasUniqueContraintFailed(error)) {
                    return { status: 'error', error: 'The user is already in your network' };
                }
                console.error('an error ocurred', error);

                return unknownServerError;
            }

            revalidatePath('/network');

            return { status: 'success' } as const;
        } catch (error) {
            console.error('an error ocurred', error);

            return unknownServerError;
        }
    }
);
