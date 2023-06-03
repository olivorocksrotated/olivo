'use server';

import { revalidatePath } from 'next/cache';
import { zact } from 'zact/server';
import { z } from 'zod';

import { getServerSession } from '../auth/session';
import prisma from '../prisma';
import { createServerActionErrorResponse, createServerActionSuccessResponse, unknownServerError } from '../server-actions';
import { changeConnectionState } from './connection/changeState';

const errors: { [errorId: string]: { type: string, message: string } } = {
    NoConnectionWithYourself: { type: 'NoConnectionWithYourself', message: 'It is not possible to create a connection with yourself' },
    UserNotFound: { type: 'UserNotFound', message: 'The email does not belong to an existing user' },
    UserAlreadyConnected: { type: 'UserAlreadyConnected', message: 'The user is already in your network' }
};

export const createConnectionAction = zact(z.object({
    userEmail: z.string()
}))(
    async ({ userEmail }) => {
        try {
            const { user } = await getServerSession();

            if (user.email === userEmail) {
                return createServerActionErrorResponse(errors.NoConnectionWithYourself);
            }
            const acceptorUser = await prisma.user.findUnique({ where: { email: userEmail } });
            if (!acceptorUser) {
                return createServerActionErrorResponse(errors.UserNotFound);
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
                return createServerActionErrorResponse(errors.UserAlreadyConnected);
            }

            if (existingConnection && !existingConnection.active) {
                await changeConnectionState(existingConnection.id, true);
            } else {
                await prisma.networkConnection.create({
                    data: { requesterId: user.id, acceptorId: acceptorUser.id }
                });
            }

            revalidatePath('/network');

            return createServerActionSuccessResponse();
        } catch (error) {
            return createServerActionErrorResponse(unknownServerError);
        }
    }
);
