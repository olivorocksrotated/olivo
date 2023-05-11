import { getServerSession } from '@/lib/auth/session';

import AuthContext from './components/auth-context';
import Sidenav from './components/sidenav';

export default async function UserLayout({ children }: { children: React.ReactNode }) {
    const session = await getServerSession();

    return (
        <AuthContext session={session}>
            <div className="flex">
                <aside className="sticky top-0 h-screen w-48 border-r border-r-slate-800 p-5">
                    <Sidenav />
                </aside>
                <main className="grow p-5">{children}</main>
            </div>
        </AuthContext>
    );
}
