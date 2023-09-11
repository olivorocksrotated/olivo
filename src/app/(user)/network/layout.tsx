
import PageTitle from '@/app/components/ui/page-title/page-title';

export default async function NetworkLayout({ children }: { children: React.ReactNode }) {
    return (
        <article>
            <div className="mb-16"><PageTitle text="Your network" /></div>
            {children}
        </article>
    );
}
