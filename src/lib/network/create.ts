'use server';

import { revalidatePath } from 'next/cache';
import { zact } from 'zact/server';
import { z } from 'zod';

import { getServerSession } from '../auth/session';
import { ServerActionError, ServerActionSuccess, unknownServerError } from '../errors/server';
import prisma from '../prisma';

const errors: { [errorId: string]: ServerActionError } = {
    NoConnectionWithYourself: { status: 'error', error: 'It is not possible to create a connection with yourself' },
    UserNotFound: { status: 'error', error: 'The email does not belong to an existing user' },
    UserAlreadyConnected: { status: 'error', error: 'The user is already in your network' }
};

export const createConnectionAction = zact(z.object({
    userEmail: z.string()
}))(
    async ({ userEmail }) => {
        try {
            const { user } = await getServerSession();

            if (user.email === userEmail) {
                return errors.NoConnectionWithYourself;
            }
            const acceptorUser = await prisma.user.findUnique({ where: { email: userEmail } });
            if (!acceptorUser) {
                return errors.UserNotFound;
            }

            const existingConnection = await prisma.networkConnection.findMany({
                where: {
                    OR: [
                        { requesterId: user.id, acceptorId: acceptorUser.id },
                        { requesterId: acceptorUser.id, acceptorId: user.id }
                    ]
                }
            });

            if (existingConnection.length > 0) {
                return errors.UserAlreadyConnected;
            }

            await prisma.networkConnection.create({
                data: { requesterId: user.id, acceptorId: acceptorUser.id }
            });

            revalidatePath('/network');

            return { status: 'success' } as ServerActionSuccess;
        } catch (error) {
            return unknownServerError;
        }
    }
);
