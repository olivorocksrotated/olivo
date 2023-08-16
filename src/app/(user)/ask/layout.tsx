
import PageTitle from '@/app/components/ui/page-title/page-title';

export default async function Layout({ children }: { children: React.ReactNode }) {
    return (
        <article>
            <PageTitle text="Ask Olivo" />
            {children}
        </article>
    );
}
