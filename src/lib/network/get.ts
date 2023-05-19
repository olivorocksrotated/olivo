import { User } from '@prisma/client';

import { getServerSession } from '../auth/session';
import prisma from '../prisma';

type UserFields = Pick<User, 'id' | 'image' | 'name'>;

export async function getNetwork() {
    const { user } = await getServerSession();
    const relations = await prisma.networkConnection.findMany({
        where: {
            OR: [
                { requesterId: user.id },
                { acceptorId: user.id }
            ]
        },
        select: {
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

    function mapToNetworkConnection(userFields: UserFields) {
        return { ...userFields, image: userFields.image || '', name: userFields.name || '' };
    }

    return relations.map((relation) => mapToNetworkConnection(relation.acceptor.id === user.id ? relation.requester : relation.acceptor));
}
