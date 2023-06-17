
import PageTitle from '@/app/components/ui/page-title/page-title';

export default async function NetworkLayout({ children }: { children: React.ReactNode }) {
    return (
        <section>
            <PageTitle text="Your network" />
            {children}
        </section>
    );
}
