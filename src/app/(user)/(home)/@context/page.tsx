import NextLink from 'next/link';
import React from 'react';

function Link({ href, children }: { href: string; children: React.ReactNode; }) {
    return (
        <div className="rounded-full bg-gradient-to-r from-violet-500 via-blue-500 to-violet-300 p-0.5 text-lg">
            <div className="flex h-full w-full items-center justify-center rounded-full bg-neutral-800 px-8 py-1">
                <NextLink href={href}>
                    {children}
                </NextLink>
            </div>
        </div>
    );
}

export default function Context() {
    return (
        <div className="flex h-full flex-col items-center justify-center gap-4 py-2 xl:h-3/4">
            <Link href="/yesterday">Load Yesterday context</Link>
            <Link href="/dynamic">Load Dynamic context</Link>
            <Link href="/pinned">Load Pinned context</Link>
        </div>
    );
}
