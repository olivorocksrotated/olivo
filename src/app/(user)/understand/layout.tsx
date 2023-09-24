
import PageTitle from '@/app/components/ui/page-title/page-title';

export default async function Layout({ children }: { children: React.ReactNode }) {
    return (
        <article>
            <div className="mb-2"><PageTitle text="Understand" /></div>
            <div className="mb-16 text-neutral-200">Learn about your behavior and how to take action to improve yourself.</div>
            {children}
        </article>
    );
}
