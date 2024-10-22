import { getServerSession } from '../auth/session';
import prisma from '../prisma/client';

export async function getTags() {
    const { user } = await getServerSession();

    return prisma.tag.findMany({ where: { ownerId: user.id } });
}
