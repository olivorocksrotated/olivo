import Notifications from '../notifications/notifications';
import Sidenav from './sidenav/sidenav';

export default function Content({ children }: { children: React.ReactNode }) {
    return (
        <div>
            <Sidenav />
            <main className="flex grow justify-between p-5 sm:ml-64">
                <div className="grow">{children}</div>
                <Notifications />
            </main>
        </div>
    );
}
