
import PageTitle from '@/app/components/ui/page-title/page-title';

export default async function Layout({ children }: { children: React.ReactNode }) {
    return (
        <section>
            <div className="mb-16"><PageTitle text="Feedback" /></div>
            {children}
        </section>
    );
}
