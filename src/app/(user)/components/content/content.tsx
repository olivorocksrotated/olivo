import Notifications from '../notifications/notifications';
import Sidenav from './sidenav/sidenav';

export default function Content({ children }: { children: React.ReactNode }) {
    return (
        <main className="h-screen sm:flex sm:p-6 sm:pr-0">
            <div className="flex items-center justify-between p-3 sm:items-start sm:p-0">
                <Sidenav />
                <Notifications />
            </div>
            <div className="max-h-full grow p-5 sm:overflow-y-auto sm:py-0">{children}</div>
        </main>
    );
}
