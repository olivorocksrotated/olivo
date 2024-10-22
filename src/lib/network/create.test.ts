import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';

import prisma from '../prisma/client';
import { createConnectionAction } from './create';

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
                expect(result.serverError).toBe('The email does not belong to an existing user');
            });

            it('should return an error when the user attempts to create a connection with themselves', async () => {
                const result = await createConnectionAction({ userEmail: 'dev@olivo.rocks' });
                expect(result.serverError).toBe('It is not possible to create a connection with yourself');
            });

            it('should return an error when the user attempts to create a connection that already exists', async () => {
                const anotherUser = { id: '4', image: null, name: null, email: 'another@olivo.rocks' };
                await prisma.user.create({ data: anotherUser });
                await createConnectionAction({ userEmail: anotherUser.email });

                const result = await createConnectionAction({ userEmail: anotherUser.email });
                expect(result.serverError).toBe('The user is already in your network');
            });

            it('should return an error when the user attempts to create a connection that already exists even when it was initiated by another user', async () => {
                const anotherUser = { id: '4', image: null, name: null, email: 'another@olivo.rocks' };
                await prisma.user.create({ data: anotherUser });
                await prisma.networkConnection.create({
                    data: { requesterId: anotherUser.id, acceptorId: loggedInUserId }
                });

                const result = await createConnectionAction({ userEmail: anotherUser.email });
                expect(result.serverError).toBe('The user is already in your network');
            });
        });
    });
});
