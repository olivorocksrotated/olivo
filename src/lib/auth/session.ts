import { NextApiRequest, NextApiResponse } from 'next';
import { cookies, headers } from 'next/headers';
import { getServerSession as nextAuthGetServerSession, Session } from 'next-auth';

import { authOptions } from '@/pages/api/old_auth/[...nextauth]';

// There is a bug in Next when trying to get the session in server actions
// https://github.com/nextauthjs/next-auth/issues/7486#issuecomment-1543747325
function requestAsyncStorageWorkaround() {
    const req = {
        headers: Object.fromEntries(headers() as Headers),
        cookies: Object.fromEntries(
            cookies()
                .getAll()
                .map((c) => [c.name, c.value]),
        )
    };
    // eslint-disable-next-line no-empty-function
    const res = { getHeader() {}, setCookie() {}, setHeader() {} };

    return nextAuthGetServerSession(req as any, res as any, authOptions);
}

export async function getServerSession(req: NextApiRequest | undefined = undefined, res: NextApiResponse<any> | undefined = undefined) {
    const isApiRequest = !!req && !!res;

    const session = isApiRequest ?
        await nextAuthGetServerSession(req, res, authOptions) :
        await requestAsyncStorageWorkaround();

    if (session?.user?.email) {
        return session as Session;
    }

    throw new Error('Session is not established');
}
