import { AiFillHome } from 'react-icons/ai';
import { HiOutlineLightBulb } from 'react-icons/hi2';
import { MdConnectWithoutContact, MdPendingActions } from 'react-icons/md';
import { PiCirclesThreePlus, PiTrendUpBold } from 'react-icons/pi';
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
        id: '(home)',
        path: '/',
        title: 'Home',
        icon: <AiFillHome size={18} />
    },
    {
        id: 'pending',
        path: '/pending',
        title: 'Pending',
        icon: <MdPendingActions size={18} />
    },
    {
        id: 'organize',
        path: '/commitments',
        title: 'Organize',
        icon: <PiCirclesThreePlus size={18} />
    },
    {
        id: 'reflect',
        path: '/reflect',
        title: 'Reflect',
        icon: <TbMoodCheck size={18} />
    },
    {
        id: 'understand',
        path: '/understand',
        title: 'Understand',
        icon: <HiOutlineLightBulb size={18} />
    },
    {
        id: 'connect',
        path: '/connect',
        title: 'Connect',
        icon: <MdConnectWithoutContact size={18} />,
        hasSeparator: true
    },
    {
        id: 'improve',
        path: '/feedback',
        title: 'Improve',
        icon: <PiTrendUpBold size={18} />
    }
];
