import { getServerSession } from '@/lib/auth/session';

import AuthContext from './components/auth-context';
import Content from './components/content';

export default async function UserLayout({ children }: { children: React.ReactNode }) {
    const session = await getServerSession();

    return (
        <AuthContext session={session}>
            <Content>{children}</Content>
        </AuthContext>
    );
}
