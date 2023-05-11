import { getServerSession } from '@/lib/auth/session';

import AuthContext from './components/auth-context';
import LogoutButton from './components/logout-btn';

export default async function UserLayout({ children }: { children: React.ReactNode; }) {
    const session = await getServerSession();

    return (
        <AuthContext session={session}>
            <div className="p-6">
                <nav className="flex justify-end">
                    <LogoutButton></LogoutButton>
                </nav>
                <div>
                    {children}
                </div>
            </div>
        </AuthContext>
    );
}
