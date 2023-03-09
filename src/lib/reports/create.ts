import prisma from '../prisma';

export async function createReportRelation(managerId: string, reportId: string) {
    const relation = await prisma.reportRelation.create({
        data: { managerId, reportId }
    });

    return relation.id;
}
