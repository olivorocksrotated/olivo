import { PrismaAdapter } from '@next-auth/prisma-adapter';
import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import GithubProvider from 'next-auth/providers/github';

import prisma from '../../../lib/prisma';

export const authOptions = {
    adapter: PrismaAdapter(prisma),
    providers: [
        GithubProvider({
            clientId: process.env.GITHUB_ID as string,
            clientSecret: process.env.GITHUB_SECRET as string,
            allowDangerousEmailAccountLinking: true
        }),
        CredentialsProvider({
            name: 'Credentials',
            credentials: {
                username: { label: 'Username', type: 'text', placeholder: 'jsmith' },
                password: { label: 'Password', type: 'password' }
            },
            async authorize() {
                return { id: '1', name: 'Developer', email: 'dev@olivo.rocks' };
            }
        })
    ],
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
