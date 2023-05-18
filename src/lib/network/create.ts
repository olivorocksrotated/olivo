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
            const targetUser = await prisma.user.findUnique({ where: { email: userEmail } });
            if (!targetUser) {
                throw new Error('The email does not belong to an existing user');
            }
            await prisma.reportRelation.create({
                data: { managerId: user.id, reportId: targetUser.id }
            });
        } catch (error) {
            if (hasUniqueContraintFailed(error)) {
                throw new Error('The user is already a report of the manager');
            }
            throw error;
        }

        revalidatePath('/network');
    }
);
