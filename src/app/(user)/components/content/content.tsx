import Notifications from '../notifications/notifications';
import Sidenav from './sidenav/sidenav';

export default function Content({ children }: { children: React.ReactNode }) {
    return (
        <div className="sm:flex sm:p-6">
            <div className="flex items-center justify-between p-3 sm:items-start">
                <Sidenav />
                <Notifications />
            </div>
            <main className="grow p-5 sm:py-0">{children}</main>
        </div>
    );
}
