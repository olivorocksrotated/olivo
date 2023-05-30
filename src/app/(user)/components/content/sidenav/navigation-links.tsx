import { AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { useSelectedLayoutSegment } from 'next/navigation';
import { useState } from 'react';
import { AiFillHome } from 'react-icons/ai';
import { BsPeopleFill } from 'react-icons/bs';
import { FaTasks } from 'react-icons/fa';
import { LuMessagesSquare } from 'react-icons/lu';
import { TbMoodCheck } from 'react-icons/tb';

import HoverMark from './hover-mark';
import SelectedBackground from './selected-background';

interface NavigationLink {
    id: string
    path: string,
    title: string,
    icon: React.ReactNode
}

const links: NavigationLink[] = [
    {
        id: 'home',
        path: '/',
        title: 'Home',
        icon: <AiFillHome size={18} />
    },
    {
        id: 'commitments',
        path: '/commitments',
        title: 'Commitments',
        icon: <FaTasks size={18} />
    },
    {
        id: 'moods',
        path: '/moods',
        title: 'Your moods',
        icon: <TbMoodCheck size={18} />
    },
    {
        id: 'network',
        path: '/network',
        title: 'Your network',
        icon: <BsPeopleFill size={18} />
    },
    {
        id: 'feedback',
        path: '/feedback',
        title: 'Feedback',
        icon: <LuMessagesSquare size={18} />
    }
];

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
            <ul onMouseLeave={() => setHovered(selectedHoverIndex)} className="mt-2 space-y-2 border-t border-gray-700 pt-4">
                {links.map((currentLink) => (
                    <li key={currentLink.id} onMouseEnter={() => setHovered(hoverIndexes[currentLink.id])} className="relative">
                        {isSameIdOrHome(currentLink.id) ? <SelectedBackground /> : null}
                        {hovered === hoverIndexes[currentLink.id] ? <HoverMark /> : null}
                        <Link href={currentLink.path} className="relative z-20 flex items-center gap-3 p-2 pl-4 text-sm font-thin text-white">
                            <span className="text-gray-400">{currentLink.icon}</span>
                            <span>{currentLink.title}</span>
                        </Link>
                    </li>))}
            </ul>
        </AnimatePresence>
    );
}
