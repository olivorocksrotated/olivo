import { generatePrismock } from 'prismock';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';

import prisma from '../prisma';
import { createConnectionAction } from './create';

vi.mock('../prisma', async () => ({
    default: await generatePrismock()
}));

vi.mock('next/cache', async () => ({
    revalidatePath: vi.fn()
}));

vi.mock('../auth/session', async () => ({
    getServerSession: vi.fn().mockResolvedValue({ user: { id: '1', email: 'dev@olivo.rocks' } })
}));

describe('lib network', () => {
    describe('create', () => {
        describe('createConnectionAction', () => {
            const loggedInUserId = '1'; // must match what getServerSession mock returns.
            const userEmail = 'dev@olivo.rocks';

            beforeEach(async () => {
                await prisma.user.create({ data: { id: loggedInUserId, name: 'loggedInUser', email: userEmail } });
            });

            afterEach(async () => {
                await prisma.user.deleteMany({});
                await prisma.networkConnection.deleteMany({});
            });

            it('should create a connection between the users', async () => {
                const anotherUser = { id: '4', image: null, name: null, email: 'another@olivo.rocks' };
                await prisma.user.create({ data: anotherUser });
                await createConnectionAction({ userEmail: anotherUser.email });

                const connection = await prisma.networkConnection.findFirst();

                expect(connection?.requesterId).toBe(loggedInUserId);
                expect(connection?.acceptorId).toBe(anotherUser.id);
            });

            it('should return an error when the user does not exist', async () => {
                const result = await createConnectionAction({ userEmail: 'unexisting@olivo.rocks' });
                expect((result as { error: string }).error).toBe('The email does not belong to an existing user');
            });

            it('should return an error when the user attempts to create a connection with themselves', async () => {
                const result = await createConnectionAction({ userEmail: 'dev@olivo.rocks' });
                expect((result as { error: string }).error).toBe('It is not possible to create a connection with yourself');
            });
        });
    });
});
