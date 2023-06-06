import { Account, Profile, User } from 'next-auth';
import { AdapterUser } from 'next-auth/adapters';
import { JWT } from 'next-auth/jwt';

import { inngest } from '@/lib/inngest/client';
import { userCreatedEvent } from '@/lib/inngest/events';

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
            name: userCreatedEvent.name,
            data: { userId: user.id }
        });
    }

    return { ...token, isNewUser: !!isNewUser };
}
