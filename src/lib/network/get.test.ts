import { generatePrismock } from 'prismock';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';

import prisma from '../prisma';
import { getNetwork } from './get';

vi.mock('../prisma', async () => ({
    default: await generatePrismock()
}));

vi.mock('../auth/session', async () => ({
    getServerSession: vi.fn().mockResolvedValue({ user: { id: '1' } })
}));

describe('lib network', () => {
    describe('get', () => {
        describe('getNetwork', () => {
            const loggedInUserId = '1'; // must match what getServerSession mock returns.

            beforeEach(async () => {
                await prisma.user.create({ data: { id: loggedInUserId, name: 'loggedInUser' } });
            });

            afterEach(async () => {
                await prisma.user.deleteMany({});
                await prisma.networkConnection.deleteMany({});
            });

            it('should return the network of the user', async () => {
                const user1 = { id: '2', image: 'image2', name: 'name2' };
                const user2 = { id: '3', image: 'image3', name: 'name3' };
                await prisma.user.create({ data: user1 });
                await prisma.user.create({ data: user2 });
                const connection1 = await prisma.networkConnection.create({ data: { requesterId: loggedInUserId, acceptorId: user1.id } });
                const connection2 = await prisma.networkConnection.create({ data: { requesterId: loggedInUserId, acceptorId: user2.id } });

                const network = await getNetwork();

                expect(network).to.be.deep.equal([
                    { id: connection1.id, user: user1 },
                    { id: connection2.id, user: user2 }
                ]);
            });

            it('should return default values if the user does not have name and image', async () => {
                const anotherUser = { id: '4', image: null, name: null };
                await prisma.user.create({ data: anotherUser });
                const connection = await prisma.networkConnection.create({ data: { requesterId: loggedInUserId, acceptorId: anotherUser.id } });

                const network = await getNetwork();

                expect(network).to.deep.contain({ id: connection.id, user: { id: '4', image: '', name: '' } });
            });

            it('should return the other user of the relation', async () => {
                const anotherUser = { id: '4', image: 'img', name: 'usr' };
                await prisma.user.create({ data: anotherUser });
                const connection = await prisma.networkConnection.create({ data: { requesterId: anotherUser.id, acceptorId: loggedInUserId } });

                const network = await getNetwork();

                expect(network).to.deep.contain({ id: connection.id, user: anotherUser });
            });
        });
    });
});

