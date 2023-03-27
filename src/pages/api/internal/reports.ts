import type { NextApiRequest, NextApiResponse } from 'next';

import { getServerSession } from '@/lib/auth/session';
import { HttpMethod, route } from '@/lib/http/route';
import { createReportRelation } from '@/lib/reports/create';

import prisma from '../../../lib/prisma';

interface AddReportApiRequest extends NextApiRequest {
    body: {
        reportEmail: string;
    }
}

async function post(req: AddReportApiRequest, res: NextApiResponse) {
    const session = await getServerSession(req, res);
    const { reportEmail } = req.body;
    const report = await prisma.user.findUnique({ where: { email: reportEmail } });
    if (report) {
        await createReportRelation(session.user.id, report.id);

        return res.status(200).json({});
    }

    res.status(400).json({ message: 'reportEmail does not belong to an existing user' });
}

export default route({
    [HttpMethod.POST]: post
});
