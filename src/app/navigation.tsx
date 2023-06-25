import { AiFillHome } from 'react-icons/ai';
import { BsPeopleFill } from 'react-icons/bs';
import { FaTasks } from 'react-icons/fa';
import { LuMessagesSquare } from 'react-icons/lu';
import { TbMoodCheck } from 'react-icons/tb';

export type NavigationLink = {
    id: string
    path: string,
    title: string,
    icon: React.ReactNode,
    hasSeparator?: true
}

export const links: NavigationLink[] = [
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
        icon: <BsPeopleFill size={18} />,
        hasSeparator: true
    },
    {
        id: 'feedback',
        path: '/feedback',
        title: 'Feedback',
        icon: <LuMessagesSquare size={18} />
    }
];
