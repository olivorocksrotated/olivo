import Notifications from '../notifications/notifications';
import Sidenav from './sidenav/sidenav';

export default function Content({ children }: { children: React.ReactNode }) {
    return (
        <main className="sm:flex sm:p-6">
            <div className="flex items-center justify-between p-3 sm:items-start sm:p-0">
                <Sidenav />
                <Notifications />
            </div>
            <div className="grow p-5 sm:py-0">{children}</div>
        </main>
    );
}
