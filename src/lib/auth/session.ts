import { NextApiRequest, NextApiResponse } from 'next';
import { getServerSession as nextAuthGetServerSession, Session } from 'next-auth';

import { authOptions } from '@/pages/api/auth/[...nextauth]';

export async function getServerSession(req: NextApiRequest | undefined = undefined, res: NextApiResponse<any> | undefined = undefined) {
    const session = !!req && !!res ?
        await nextAuthGetServerSession(req, res, authOptions) :
        await nextAuthGetServerSession(authOptions);

    if (session?.user?.email) {
        return session as Session;
    }

    throw new Error('Session is not established');
}
