function Section({ children, className }: { children: React.ReactNode, className?: string }) {
    return (
        <div className={`flex max-h-full flex-col overflow-hidden rounded-lg bg-neutral-900 p-2 ${className}`}>
            {children}
        </div>
    );
}

type LayoutProps = {
    children: React.ReactNode;
    context: React.ReactNode;
    daily: React.ReactNode;
};

export default async function ContextLayout({ children, context, daily }: LayoutProps) {
    return (
        <article className="flex h-full max-h-full flex-col lg:pr-16">
            {children}
            <div className="min-h-0 grow">
                <div className="grid grid-cols-1 gap-4 xl:h-full xl:grid-cols-2">
                    <Section>
                        {context}
                    </Section>

                    <Section className="xl:order-first">
                        {daily}
                    </Section>
                </div>
            </div>
        </article>
    );
}
