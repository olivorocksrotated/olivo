import type { NextApiRequest, NextApiResponse } from 'next';
import { getServerSession } from 'next-auth';

import { createReportRelation } from '@/lib/reports/create';

import prisma from '../../../lib/prisma';
import { authOptions } from '../auth/[...nextauth]';

export default async function handler(req: NextApiRequest, res: NextApiResponse<any>) {
    const session = await getServerSession(
        req, res, authOptions
    );
    if (session?.user) {
        const { reportEmail } = req.body;
        const report = await prisma.user.findUnique({ where: { email: reportEmail } });
        if (report) {
            await createReportRelation(session.user.id, report.id);

            return res.status(200).json({});
        }
    }
    res.status(500).json({});
}
