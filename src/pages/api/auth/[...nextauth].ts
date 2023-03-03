import { PrismaAdapter } from '@next-auth/prisma-adapter';
import NextAuth from 'next-auth';
import { Provider } from 'next-auth/providers';
import CredentialsProvider from 'next-auth/providers/credentials';
import GithubProvider from 'next-auth/providers/github';

import { isDevEnvironment } from '@/lib/environment';

import prisma from '../../../lib/prisma';

const githubProvider = GithubProvider({
    clientId: process.env.GITHUB_ID as string,
    clientSecret: process.env.GITHUB_SECRET as string,
    allowDangerousEmailAccountLinking: true
});

const providers: Provider[] = [githubProvider];

if (isDevEnvironment()) {
    providers.push(CredentialsProvider({
        name: 'Credentials',
        credentials: {
            username: { label: 'Username', type: 'text', placeholder: 'developer user' },
            password: { label: 'Password', type: 'password' }
        },
        async authorize() {
            return { id: '1', name: 'Developer', email: 'dev@olivo.rocks' };
        }
    }));
}

export const authOptions = {
    adapter: PrismaAdapter(prisma),
    providers,
    callbacks: {
        async redirect({ baseUrl }: { baseUrl: string }) {
            return baseUrl;
        }
    },
    session: { strategy: 'jwt' as const },
    pages: {
        signIn: '/signin'
    }
};

export default NextAuth(authOptions);
