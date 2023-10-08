import clsx from 'clsx';
import { AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { useSelectedLayoutSegment } from 'next/navigation';
import { Fragment } from 'react';

import { links } from '@/app/navigation';

export default function NavigationLinks() {
    const selected = useSelectedLayoutSegment();
    const isSameIdOrHome = (currentLinkId: string) => selected === currentLinkId;

    const linkStyles = (linkId: string) => clsx(
        'flex h-9 max-h-9 cursor-pointer items-center gap-4 rounded border-b border-b-transparent px-3 py-2 text-sm font-thin text-white',
        'hover:bg-neutral-800',
        { '!border-b-red-400 bg-neutral-700': isSameIdOrHome(linkId) }
    );

    return (
        <AnimatePresence mode="wait">
            <ul className="space-y-2">
                {links.map((currentLink) => (
                    <Fragment key={currentLink.id}>
                        {currentLink.hasSeparator ? <li className="border-t border-neutral-600"></li> : null}
                        <li>
                            <Link href={currentLink.path} className={linkStyles(currentLink.id)}>
                                <span className="text-neutral-200">{currentLink.icon}</span>
                                <span>{currentLink.title}</span>
                            </Link>
                        </li>
                    </Fragment>
                ))}
            </ul>
        </AnimatePresence>
    );
}
