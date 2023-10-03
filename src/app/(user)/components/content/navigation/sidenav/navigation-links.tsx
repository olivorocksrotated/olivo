import { AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { useSelectedLayoutSegment } from 'next/navigation';
import { Fragment } from 'react';

import { links } from '@/app/navigation';

export default function NavigationLinks() {
    const selected = useSelectedLayoutSegment();
    const isSameIdOrHome = (currentLinkId: string) => selected === currentLinkId;

    return (
        <AnimatePresence mode="wait">
            <ul className="space-y-2">
                {links.map((currentLink) => (
                    <Fragment key={currentLink.id}>
                        {currentLink.hasSeparator ? <li className="border-t border-neutral-600"></li> : null}
                        <li
                            className={`
                                ${isSameIdOrHome(currentLink.id) ? 'border-b border-b-red-400 bg-neutral-700' : ''}
                                h-9 max-h-9 cursor-pointer rounded px-3 py-2
                                hover:bg-neutral-800
                            `}
                        >
                            <Link href={currentLink.path} className="flex items-center gap-4 text-sm font-thin text-white">
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
