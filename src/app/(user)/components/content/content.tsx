import Notifications from '../notifications/notifications';
import Sidenav from './sidenav/sidenav';

export default function Content({ children }: { children: React.ReactNode }) {
    return (
        <div className="sm:flex sm:py-10" style={{ background: '#17191a' }}>
            <div className="flex items-center justify-between sm:items-start">
                <Sidenav />
                <Notifications />
            </div>
            <main className="grow p-5 sm:py-0">{children}</main>
        </div>
    );
}
