import NextLink from 'next/link';

function BackLink({ href }: { href: string }) {
    return (
        <div className="text-ellipsis whitespace-nowrap rounded-full bg-gradient-to-r from-violet-500 via-blue-500 to-violet-300 p-0.5 text-sm">
            <div className="flex h-full w-full items-center justify-center rounded-full bg-neutral-800 px-8 py-1">
                <NextLink href={href}>Change context</NextLink>
            </div>
        </div>
    );
}

export default function ContextPageTitle({ title }: { title: string }) {
    return (
        <div className="mb-3 flex items-start justify-between gap-4">
            <div className="text-2xl text-neutral-300">{title}</div>
            <BackLink href="/"></BackLink>
        </div>
    );
}
