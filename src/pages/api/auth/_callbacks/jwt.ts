import { Account, Profile, User } from 'next-auth';
import { AdapterUser } from 'next-auth/adapters';
import { JWT } from 'next-auth/jwt';

import { inngest } from '@/inngest/client';

export default async function jwtCallback({ token, user, trigger, isNewUser }: {
    token: JWT;
    user: User | AdapterUser;
    account: Account | null;
    profile?: Profile | undefined;
    trigger?: 'signIn' | 'signUp' | 'update' | undefined;
    isNewUser?: boolean | undefined;
    session?: any;
}) {
    if (trigger === 'signUp') {
        await inngest.send({
            name: 'user/created',
            data: { userId: user.id }
        });
    }

    return { ...token, isNewUser: !!isNewUser };
}
