import type { NextApiRequest, NextApiResponse } from 'next';

import { getServerSession } from '@/lib/auth/session';
import { createCommitment } from '@/lib/commitments/create';
import { HttpMethod, route } from '@/lib/http/route';

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

export default route({
    [HttpMethod.POST]: post
});
