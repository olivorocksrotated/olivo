import prisma from '../prisma';

export async function getReportsByManager(managerId: string) {
    const relations = await prisma.reportRelation.findMany({
        where: { managerId },
        include: {
            report: {
                select: {
                    id: true,
                    name: true
                }
            }
        }
    });

    return relations.map((relation) => relation.report);
}
