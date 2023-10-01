import Navigation from './navigation/navigation';

export default function Content({ children }: { children: React.ReactNode }) {
    return (
        <>
            <Navigation />
            <main aria-label="Content" className="h-auto pt-12 sm:ml-56">
                <div className="p-5">{children}</div>
            </main>
        </>
    );
}
