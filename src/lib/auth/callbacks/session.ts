import { JWT } from '@auth/core/jwt';
import { Session } from 'next-auth';

export default async function sessionCallback({ session, token }: { session: Session, token: JWT }) {
    return {
        ...session,
        user: {
            ...session?.user,
            id: token.sub ?? '',
            isNewUser: token.isNewUser
        }
    };
}
