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
    const [hovered, setHovered] = useState<number>();

    const itemClasses = 'relative';
    const linkClasses = 'relative z-20 flex items-center p-2 pl-4 text-sm font-thin text-white';
    const iconClasses = 'mr-3 text-gray-400';
    const selectedHoverIndex = {
        home: 1,
        commitments: 2,
        network: 3,
        moods: 4
    }[selected ?? 'home'];

    return (
        <AnimatePresence mode="wait">
            <ul onMouseLeave={() => setHovered(selectedHoverIndex)} className="mt-2 space-y-2 border-t border-gray-700 pt-4">
                <li onMouseEnter={() => setHovered(1)} className={itemClasses}>
                    {selected === null ? <SelectedBackground /> : null}
                    {hovered === 1 ? <HoverMark /> : null}
                    <Link href="/" className={linkClasses}>
                        <AiFillHome size={18} className={iconClasses} />
                        <span>Home</span>
                    </Link>
                </li>
                <li onMouseEnter={() => setHovered(2)} className={itemClasses}>
                    {selected === 'commitments' ? <SelectedBackground /> : null}
                    {hovered === 2 ? <HoverMark /> : null}
                    <Link href="/commitments" className={linkClasses}>
                        <FaTasks size={18} className={iconClasses} />
                        <span>Commitments</span>
                    </Link>
                </li>
                <li onMouseEnter={() => setHovered(3)} className={itemClasses}>
                    {selected === 'network' ? <SelectedBackground /> : null}
                    {hovered === 3 ? <HoverMark /> : null}
                    <Link href="/network" className={linkClasses}>
                        <BsPeopleFill size={18} className={iconClasses} />
                        <span>Your Network</span>
                    </Link>
                </li>
                <li onMouseEnter={() => setHovered(4)} className={itemClasses}>
                    {selected === 'moods' ? <SelectedBackground /> : null}
                    {hovered === 4 ? <HoverMark /> : null}
                    <Link href="/moods" className={linkClasses}>
                        <TbMoodCheck size={18} className={iconClasses} />
                        <span>Your Moods</span>
                    </Link>
                </li>
            </ul>
        </AnimatePresence>
    );
}
