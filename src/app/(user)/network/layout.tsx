
import PageTitle from '@/app/components/page-title';

export default async function NetworkLayout({ children }: { children: React.ReactNode }) {
    return (
        <section>
            <PageTitle text="Your network" />
            {children}
        </section>
    );
}
