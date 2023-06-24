import { getServerSession } from '@/lib/auth/session';

import AuthContext from './components/auth-context';
import CommandMenu from './components/command-menu/command-menu';
import Content from './components/content/content';

export default async function UserLayout({ children }: { children: React.ReactNode }) {
    const session = await getServerSession();

    return (
        <AuthContext session={session}>
            <CommandMenu></CommandMenu>
            <Content>{children}</Content>
        </AuthContext>
    );
}
