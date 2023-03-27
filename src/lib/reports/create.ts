import { Prisma } from '@prisma/client';

import prisma from '../prisma';

const UniqueContraintFailed = 'P2002';

export async function createReportRelation(managerId: string, reportEmail: string) {
    try {
        const report = await prisma.user.findUnique({ where: { email: reportEmail } });
        if (!report) {
            throw new Error('The user is already a report of the manager');
        }
        const relation = await prisma.reportRelation.create({
            data: { managerId, reportId: report.id }
        });

        return relation.id;
    } catch (error) {
        if (error instanceof Prisma.PrismaClientKnownRequestError && error.code === UniqueContraintFailed) {
            throw new Error('The user is already a report of the manager');
        }
        throw error;
    }
}
