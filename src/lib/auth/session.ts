import { getServerSession as nextAuthGetServerSession, Session } from 'next-auth';

import { authOptions } from '@/pages/api/auth/[...nextauth]';

export async function getServerSession() {
    const session = await nextAuthGetServerSession(authOptions);
    if (session?.user?.email) {
        return session as Session;
    }

    throw new Error('Session is not established');
}
