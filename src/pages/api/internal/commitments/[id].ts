import { CommitmentStatus } from '@prisma/client';
import type { NextApiRequest, NextApiResponse } from 'next';

import { getServerSession } from '@/lib/auth/session';
import { updateCommitment } from '@/lib/commitments/update';
import { HttpMethod, route } from '@/lib/http/route';

interface PatchCommitmentApiRequest extends NextApiRequest {
    body: {
        status?: CommitmentStatus;
    }
}

async function put(req: PatchCommitmentApiRequest, res: NextApiResponse) {
    const session = await getServerSession(req, res);
    const { id } = req.query;

    await updateCommitment(session.user.id, id as string, req.body);

    return res.status(200).end();
}

export default route({
    [HttpMethod.PUT]: put
});
