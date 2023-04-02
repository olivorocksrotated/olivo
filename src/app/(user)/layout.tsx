import LogoutButton from './components/logout-btn';

export default function UserLayout({ children }: { children: React.ReactNode; }) {
    return (
        <div className="p-6">
            <nav className="flex justify-end">
                <LogoutButton></LogoutButton>
            </nav>
            <div>
                {children}
            </div>
        </div>
    );
}
