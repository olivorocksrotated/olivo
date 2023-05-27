import { Session } from 'next-auth';
import { JWT } from 'next-auth/jwt';

export default async function sessionCallback({ session, token }: { session: Session, token: JWT }) {
    return {
        ...session,
        user: { ...session?.user, id: token.sub ?? '' }
    };
}
