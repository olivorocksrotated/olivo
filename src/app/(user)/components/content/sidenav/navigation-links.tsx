import { AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { useSelectedLayoutSegment } from 'next/navigation';
import { useState } from 'react';
import { AiFillHome } from 'react-icons/ai';
import { BsPeopleFill } from 'react-icons/bs';
import { FaTasks } from 'react-icons/fa';
import { TbMoodCheck } from 'react-icons/tb';

import HoverMark from './hover-mark';
import SelectedBackground from './selected-background';

export default function NavigationLinks() {
    const selected = useSelectedLayoutSegment();
    const selectedHoverIndex = {
        home: 1,
        commitments: 2,
        network: 3,
        moods: 4
    }[selected ?? 'home'] as number;
    const [hovered, setHovered] = useState<number>(selectedHoverIndex);

    const listItem = ({ hoverIndex, selectedId, link }: {
        hoverIndex: number,
        selectedId: string | null,
        link: {
            path: string,
            title: string,
            icon: React.ReactNode
        }
    }) => (
        <li onMouseEnter={() => setHovered(hoverIndex)} className="relative">
            {selected === selectedId ? <SelectedBackground /> : null}
            {hovered === hoverIndex ? <HoverMark /> : null}
            <Link href={link.path} className="relative z-20 flex items-center gap-3 p-2 pl-4 text-sm font-thin text-white">
                <span className="text-gray-400">{link.icon}</span>
                <span>{link.title}</span>
            </Link>
        </li>
    );

    return (
        <AnimatePresence mode="wait">
            <ul onMouseLeave={() => setHovered(selectedHoverIndex)} className="mt-2 space-y-2 border-t border-gray-700 pt-4">
                {listItem({
                    hoverIndex: 1,
                    selectedId: null,
                    link: {
                        path: '/',
                        title: 'Home',
                        icon: <AiFillHome size={18} />
                    }
                })}
                {listItem({
                    hoverIndex: 2,
                    selectedId: 'commitments',
                    link: {
                        path: '/commitments',
                        title: 'Commitments',
                        icon: <FaTasks size={18} />
                    }
                })}
                {listItem({
                    hoverIndex: 3,
                    selectedId: 'network',
                    link: {
                        path: '/network',
                        title: 'Your network',
                        icon: <BsPeopleFill size={18} />
                    }
                })}
                {listItem({
                    hoverIndex: 4,
                    selectedId: 'moods',
                    link: {
                        path: '/moods',
                        title: 'Your moods',
                        icon: <TbMoodCheck size={18} />
                    }
                })}
            </ul>
        </AnimatePresence>
    );
}
