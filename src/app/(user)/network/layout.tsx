
import PageTitle from '@/app/components/ui/page-title/page-title';

export default async function NetworkLayout({ children }: { children: React.ReactNode }) {
    return (
        <article>
            <PageTitle text="Your network" />
            {children}
        </article>
    );
}
