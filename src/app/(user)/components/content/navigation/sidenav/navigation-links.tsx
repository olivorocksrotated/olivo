import { AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { useSelectedLayoutSegment } from 'next/navigation';
import { Fragment, useState } from 'react';

import { links } from '@/app/navigation';

import HoverMark from './hover-mark';
import SelectedBackground from './selected-background';

export default function NavigationLinks() {
    const selected = useSelectedLayoutSegment();
    const hoverIndexes = links.reduce((acc, currentLink, currentIndex) => ({
        ...acc,
        [currentLink.id]: currentIndex
    }), {} as { [linkId: string]: number });
    const selectedHoverIndex = hoverIndexes[selected ?? links[0].id];

    const [hovered, setHovered] = useState(selectedHoverIndex);

    const isSameIdOrHome = (currentLinkId: string) => selected === currentLinkId || !selected && hoverIndexes[currentLinkId] === 0;

    return (
        <AnimatePresence mode="wait">
            <ul onMouseLeave={() => setHovered(selectedHoverIndex)} className="space-y-2">
                {links.map((currentLink) => (
                    <Fragment key={currentLink.id}>
                        {currentLink.hasSeparator ? <li className="border-t border-neutral-600"></li> : null}
                        <li onMouseEnter={() => setHovered(hoverIndexes[currentLink.id])} className="relative">
                            {isSameIdOrHome(currentLink.id) ? <SelectedBackground /> : null}
                            {hovered === hoverIndexes[currentLink.id] ? <HoverMark /> : null}
                            <Link href={currentLink.path} className="relative z-20 flex items-center gap-3 p-2 pl-4 text-sm font-thin text-white">
                                <span className="text-gray-400">{currentLink.icon}</span>
                                <span>{currentLink.title}</span>
                            </Link>
                        </li>
                    </Fragment>
                ))}
            </ul>
        </AnimatePresence>
    );
}
