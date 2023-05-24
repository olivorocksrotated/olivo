import Sidenav from './sidenav/sidenav';

export default function Content({ children }: { children: React.ReactNode }) {
    return (
        <div>
            <Sidenav />
            <main className="grow p-5 sm:ml-64">{children}</main>
        </div>
    );
}
