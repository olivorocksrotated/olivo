'use server';

import { revalidatePath } from 'next/cache';
import { z } from 'zod';

import { getServerSession } from '../auth/session';
import prisma from '../prisma/client';
import { ServerActionError } from '../server-actions/errors';
import { createServerActionError, createServerActionUnknownError } from '../server-actions/response';
import { action } from '../server-actions/safe-action-client';
import { updateConnectionState } from './connection/update';

const errors: { [errorId: string]: { type: string, message: string } } = {
    NoConnectionWithYourself: { type: 'NoConnectionWithYourself', message: 'It is not possible to create a connection with yourself' },
    UserNotFound: { type: 'UserNotFound', message: 'The email does not belong to an existing user' },
    UserAlreadyConnected: { type: 'UserAlreadyConnected', message: 'The user is already in your network' }
};

export const createConnectionAction = action(z.object({
    userEmail: z.string()
}), async ({ userEmail }) => {
    try {
        const { user } = await getServerSession();

        if (user.email === userEmail) {
            throw createServerActionError(errors.NoConnectionWithYourself);
        }
        const acceptorUser = await prisma.user.findUnique({ where: { email: userEmail } });
        if (!acceptorUser) {
            throw createServerActionError(errors.UserNotFound);
        }

        const existingConnection = await prisma.networkConnection.findFirst({
            where: {
                OR: [
                    { requesterId: user.id, acceptorId: acceptorUser.id },
                    { requesterId: acceptorUser.id, acceptorId: user.id }
                ]
            }
        });

        if (existingConnection && existingConnection.active) {
            throw createServerActionError(errors.UserAlreadyConnected);
        }

        if (existingConnection && !existingConnection.active) {
            await updateConnectionState(existingConnection.id, true);
        } else {
            await prisma.networkConnection.create({
                data: { requesterId: user.id, acceptorId: acceptorUser.id }
            });
        }

        revalidatePath('/network');
    } catch (error) {
        if (error instanceof ServerActionError) {
            throw error;
        }

        throw createServerActionUnknownError();
    }
});
