import { Account, Profile, User } from 'next-auth';
import { AdapterUser } from 'next-auth/adapters';
import { JWT } from 'next-auth/jwt';

import { userCreatedEvent } from '@/flows/signup/events';
import { sendEvent } from '@/lib/inngest/send-event';

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
        await sendEvent({
            name: userCreatedEvent.name,
            data: { userId: user.id }
        });
    }

    return { ...token, isNewUser: !!isNewUser };
}
