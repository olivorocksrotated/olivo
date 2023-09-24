
import PageTitle from '@/app/components/ui/page-title/page-title';

export default async function Layout({ children }: { children: React.ReactNode }) {
    return (
        <article>
            <div className="mb-16"><PageTitle text="Reflect" /></div>
            {children}
        </article>
    );
}
