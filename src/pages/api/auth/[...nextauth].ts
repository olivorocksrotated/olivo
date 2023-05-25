import { PrismaAdapter } from '@next-auth/prisma-adapter';
import NextAuth, { Session } from 'next-auth';
import { JWT } from 'next-auth/jwt';
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
            return {
                id: '1',
                name: 'Developer',
                email: 'dev@olivo.rocks',
                image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2340&q=80'
            };
        }
    }));
}

export const authOptions = {
    adapter: PrismaAdapter(prisma),
    providers,
    callbacks: {
        async redirect({ baseUrl }: { baseUrl: string }) {
            return baseUrl;
        },
        async session({ session, token }: { session: Session, token: JWT }) {
            return {
                ...session,
                user: { ...session?.user, id: token.sub ?? '' }
            };
        }
    },
    session: { strategy: 'jwt' as const },
    pages: {
        signIn: '/signin'
    }
};

export default NextAuth(authOptions);
