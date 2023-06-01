import { getServerSession } from '../auth/session';
import prisma from '../prisma';
import { ConnectionUserFields } from './types';

export async function getNetwork() {
    const { user } = await getServerSession();
    const relations = await prisma.networkConnection.findMany({
        where: {
            OR: [
                { requesterId: user.id },
                { acceptorId: user.id }
            ],
            active: true
        },
        select: {
            id: true,
            acceptor: {
                select: {
                    id: true,
                    name: true,
                    image: true
                }
            },
            requester: {
                select: {
                    id: true,
                    name: true,
                    image: true
                }
            }
        },
        orderBy: {
            createdAt: 'asc'
        }
    });

    function mapToNetworkConnection({ acceptor, requester, id }: { acceptor: ConnectionUserFields, requester: ConnectionUserFields, id: string }) {
        const userFields: ConnectionUserFields = acceptor.id === user.id ? requester : acceptor;

        return { id, user: { ...userFields, image: userFields.image || '', name: userFields.name || '' } };
    }

    return relations.map(mapToNetworkConnection);
}
