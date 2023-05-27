import { Account, Profile, User } from 'next-auth';
import { AdapterUser } from 'next-auth/adapters';
import { JWT } from 'next-auth/jwt';

export default async function jwtCallback({ token, isNewUser }: {
    token: JWT;
    user: User | AdapterUser;
    account: Account | null;
    profile?: Profile | undefined;
    trigger?: 'signIn' | 'signUp' | 'update' | undefined;
    isNewUser?: boolean | undefined;
    session?: any;
}) {
    return { ...token, isNewUser: !!isNewUser };
}
