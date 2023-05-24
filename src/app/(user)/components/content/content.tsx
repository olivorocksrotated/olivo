import Notifications from '../notifications/notifications';
import Sidenav from './sidenav/sidenav';

export default function Content({ children }: { children: React.ReactNode }) {
    return (
        <div>
            <div className="flex items-center justify-between px-3 py-2 sm:p-0">
                <Sidenav />
                <Notifications />
            </div>
            <main className="grow p-5 sm:ml-64">{children}</main>
        </div>
    );
}
