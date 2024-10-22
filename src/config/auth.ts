import { Provider } from '@auth/core/providers';
import CredentialsProvider from '@auth/core/providers/credentials';
import GithubProvider from '@auth/core/providers/github';
import GoogleProvider from '@auth/core/providers/google';
import { PrismaAdapter } from '@auth/prisma-adapter';
import NextAuth from 'next-auth';

import authorized from '@/lib/auth/callbacks/authorize';
import jwt from '@/lib/auth/callbacks/jwt';
import redirect from '@/lib/auth/callbacks/redirect';
import session from '@/lib/auth/callbacks/session';
import { isDevEnvironment } from '@/lib/environment';
import prisma from '@/lib/prisma/client';

const githubProvider = GithubProvider({
    clientId: process.env.GITHUB_ID as string,
    clientSecret: process.env.GITHUB_SECRET as string,
    allowDangerousEmailAccountLinking: true
});

const googleProvider = GoogleProvider({
    clientId: process.env.GOOGLE_CLIENT_ID as string,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET as string
});

const providers: Provider[] = [githubProvider, googleProvider];

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
    callbacks: { authorized, redirect, session, jwt },
    session: { strategy: 'jwt' as const },
    pages: {
        signIn: '/signin'
    }
};

export const { handlers: { GET, POST }, auth, signIn, signOut } = NextAuth(authOptions as any);
