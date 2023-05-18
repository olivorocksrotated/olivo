import { generatePrismock } from 'prismock';
import { describe, expect, it, vi } from 'vitest';

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
            const requesterId = '1';

            it('should return the network of the user', async () => {
                const expectedUsers = [
                    { id: '2', image: 'image2', name: 'name2' },
                    { id: '3', image: 'image3', name: 'name3' }
                ];
                prisma.user.create({ data: expectedUsers[0] });
                prisma.user.create({ data: expectedUsers[1] });
                prisma.networkConnection.create({ data: { requesterId, acceptorId: expectedUsers[0].id } });
                prisma.networkConnection.create({ data: { requesterId, acceptorId: expectedUsers[1].id } });

                const network = await getNetwork();

                expect(network).to.be.deep.equal(expectedUsers);
            });

            it('should return default values if the acceptor user does not have name and image', async () => {
                const expectedUser = { id: '4', image: null, name: null };
                prisma.user.create({ data: expectedUser });
                prisma.networkConnection.create({ data: { requesterId, acceptorId: expectedUser.id } });

                const network = await getNetwork();

                expect(network).to.deep.contain({ id: '4', image: '', name: '' });
            });
        });
    });
});

