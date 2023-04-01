import prisma from '../prisma';

export async function getCommitmentsByUser(userId: string) {
    const commitments = await prisma.commitment.findMany({
        where: { ownerId: userId },
        select: {
            id: true,
            title: true,
            status: true,
            doneBy: true
        },
        orderBy: {
            doneBy: 'asc'
        }
    });

    return commitments;
}
