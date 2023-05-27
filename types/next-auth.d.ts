import { DefaultSession, JWT as NextJWT } from 'next-auth';

declare module 'next-auth' {
    // Returned by `useSession`, `getSession` and received as a prop on the `SessionProvider` React Context
    interface Session extends DefaultSession {
        user: DefaultSession['user'] & {
            id: string;
            isNewUser: boolean;
        }
    }
}

declare module 'next-auth/jwt' {
    interface JWT extends NextJWT {
        isNewUser: boolean;
    }
}
