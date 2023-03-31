import type { NextApiRequest, NextApiResponse } from 'next';

import { getServerSession } from '@/lib/auth/session';
import { HttpMethod, route } from '@/lib/http/route';
import { createReportRelation } from '@/lib/reports/create';
interface AddReportApiRequest extends NextApiRequest {
    body: {
        reportEmail: string;
    }
}

async function post(req: AddReportApiRequest, res: NextApiResponse) {
    const session = await getServerSession(req, res);
    const { reportEmail } = req.body;
    try {
        await createReportRelation(session.user.id, reportEmail);

        return res.status(200).json({});
    } catch (error: any) {
        res.status(400).json({ message: error.message });
    }
}

export default route({
    [HttpMethod.POST]: post
});
