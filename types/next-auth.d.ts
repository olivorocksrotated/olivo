import { JWT as NextJWT } from '@auth/core/jwt';
import { DefaultSession } from 'next-auth';

declare module '@auth/core/jwt' {
    interface JWT extends NextJWT {
        isNewUser: boolean;
    }
}

declare module 'next-auth' {
    // Returned by `useSession`, `getSession` and received as a prop on the `SessionProvider` React Context
    interface Session extends DefaultSession {
        user: DefaultSession['user'] & {
            id: string;
            isNewUser: boolean;
        }
    }
}
