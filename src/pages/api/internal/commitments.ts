import type { NextApiRequest, NextApiResponse } from 'next';

import { HttpMethod, route } from '@/lib/api-method/route';
import { getServerSession } from '@/lib/auth/session';
import { createCommitment } from '@/lib/commitments/create';

interface AddCommitmentApiRequest extends NextApiRequest {
    body: {
        title: string;
        doneBy: Date
    }
}

async function post(req: AddCommitmentApiRequest, res: NextApiResponse) {
    const session = await getServerSession(req, res);
    await createCommitment(session.user.id, req.body);

    return res.status(201).end();
}

export default async function handler(req: AddCommitmentApiRequest, res: NextApiResponse) {
    route(req, res, {
        [HttpMethod.POST]: post
    });
}
