
import PageTitle from '@/app/components/page-title';

export default async function Layout({ children }: { children: React.ReactNode }) {
    return (
        <main>
            <PageTitle text="Feedback" />
            {children}
        </main>
    );
}
