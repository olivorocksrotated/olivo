import type { NextApiRequest, NextApiResponse } from 'next';

import { getServerSession } from '@/lib/auth/session';
import { createCommitment } from '@/lib/commitments/create';

interface AddCommitmentApiRequest extends NextApiRequest {
    body: {
        title: string;
        doneBy: Date
    }
}

export default async function handler(req: AddCommitmentApiRequest, res: NextApiResponse<any>) {
    const session = await getServerSession(req, res);
    await createCommitment(session.user.id, req.body);

    return res.status(201).end();
}
