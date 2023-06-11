
import PageTitle from '@/app/components/page-title';

export default async function Layout({ children }: { children: React.ReactNode }) {
    return (
        <section>
            <PageTitle text="Your mood" />
            {children}
        </section>
    );
}
