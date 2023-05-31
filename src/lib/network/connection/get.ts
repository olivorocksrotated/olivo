import { getServerSession } from '../../auth/session';
import prisma from '../../prisma';
import { ConnectionUserFields } from '../types';

export async function getConnection(connectionId: string) {
    const { user } = await getServerSession();
    const connection = await prisma.networkConnection.findFirst({
        where: {
            OR: [
                { requesterId: user.id },
                { acceptorId: user.id }
            ],
            id: connectionId
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
        }
    });

    if (!connection) {
        return null;
    }

    function mapToNetworkConnection({ id, acceptor, requester }: { acceptor: ConnectionUserFields, requester: ConnectionUserFields, id: string }) {
        const connectionUser = acceptor.id === user.id ? requester : acceptor;

        return { id, user: { ...connectionUser, image: connectionUser.image || '', name: connectionUser.name || '' } };
    }

    return mapToNetworkConnection(connection);
}
