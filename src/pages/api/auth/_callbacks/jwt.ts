import { NotificationType } from '@prisma/client';
import { Account, Profile, User } from 'next-auth';
import { AdapterUser } from 'next-auth/adapters';
import { JWT } from 'next-auth/jwt';

import { createNotification } from '@/lib/notifications/persistent/create';

function handleSignup(user: User | AdapterUser) {
    createNotification(user.id, {
        title: '🎉 Welcome to Olivo!',
        type: NotificationType.SignupWelcome
    });
}

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
        handleSignup(user);
    }

    return { ...token, isNewUser: !!isNewUser };
}
