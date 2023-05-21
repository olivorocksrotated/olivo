
import PageTitle from '@/app/components/page-title';

export default async function NetworkLayout({ children }: { children: React.ReactNode }) {
    return (
        <main>
            <PageTitle text="Network" />
            {children}
        </main>
    );
}