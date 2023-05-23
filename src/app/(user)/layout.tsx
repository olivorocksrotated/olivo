import { getServerSession } from '@/lib/auth/session';

import AuthContext from './components/auth-context';
import Content from './components/content/content';
import Notifications from './components/notifications';

export default async function UserLayout({ children }: { children: React.ReactNode }) {
    const session = await getServerSession();

    return (
        <AuthContext session={session}>
            <Notifications />
            <Content>{children}</Content>
        </AuthContext>
    );
}
