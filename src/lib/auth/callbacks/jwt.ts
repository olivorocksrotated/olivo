import { AdapterUser } from '@auth/core/adapters';
import { JWT } from '@auth/core/jwt';
import { Account, Profile, User } from 'next-auth';

import { EventName } from '@/lib/inngest/client';
import { safeSendEvent } from '@/lib/inngest/send-event';

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
        await safeSendEvent({
            name: EventName.UserCreated,
            data: { userId: user.id }
        });
    }

    return { ...token, isNewUser: !!isNewUser };
}
