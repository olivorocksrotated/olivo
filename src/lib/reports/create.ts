import prisma, { hasUniqueContraintFailed } from '../prisma';

export async function createReportRelation(managerId: string, reportEmail: string) {
    try {
        const report = await prisma.user.findUnique({ where: { email: reportEmail } });
        if (!report) {
            throw new Error('The email does not belong to an existing user');
        }
        const relation = await prisma.reportRelation.create({
            data: { managerId, reportId: report.id }
        });

        return relation.id;
    } catch (error) {
        if (hasUniqueContraintFailed(error)) {
            throw new Error('The user is already a report of the manager');
        }
        throw error;
    }
}
