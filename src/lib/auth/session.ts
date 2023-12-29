import { NextApiRequest, NextApiResponse } from 'next';
import { Session } from 'next-auth';

import { auth } from '../../config/auth';

export async function getServerSession(req: NextApiRequest | undefined = undefined, res: NextApiResponse<any> | undefined = undefined) {
    const isApiRequest = !!req && !!res;

    const session = isApiRequest ?
        await auth(req, res) :
        await auth();

    if (session?.user?.id && session?.user?.email) {
        return session as Session;
    }

    throw new Error('Session is not established');
}
