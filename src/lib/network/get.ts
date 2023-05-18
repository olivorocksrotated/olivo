import { getServerSession } from '../auth/session';
import prisma from '../prisma';

export async function getNetwork() {
    const { user } = await getServerSession();
    const relations = await prisma.reportRelation.findMany({
        where: { managerId: user.id },
        include: {
            report: {
                select: {
                    id: true,
                    name: true,
                    image: true
                }
            }
        }
    });

    return relations.map((relation) => ({
        ...relation.report,
        name: relation.report.name ?? '',
        image: relation.report.image ?? ''
    }));
}
