import { getServerSession } from '../auth/session';
import prisma from '../prisma';

export async function getNetwork() {
    const { user } = await getServerSession();
    const relations = await prisma.networkConnection.findMany({
        where: {
            OR: [
                { requesterId: user.id },
                { acceptorId: user.id }
            ]
        },
        include: {
            acceptor: {
                select: {
                    id: true,
                    name: true,
                    image: true
                }
            }
        }
    });

    return relations.map((relation) => ({
        ...relation.acceptor,
        name: relation.acceptor.name ?? '',
        image: relation.acceptor.image ?? ''
    }));
}
