import prisma from '../prisma';

export async function createCommitment(userId: string, commitment: { title: string, doneBy: Date }) {
    const createdCommitment = await prisma.commitment.create({
        data: {
            ownerId: userId,
            ...commitment
        }
    });

    return createdCommitment.id;
}
