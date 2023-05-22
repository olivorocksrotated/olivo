'use client';

import clsx from 'clsx';
import { AnimatePresence, motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname, useSearchParams, useSelectedLayoutSegment } from 'next/navigation';
import { signOut, useSession } from 'next-auth/react';
import { useCallback, useState } from 'react';
import { AiFillHome } from 'react-icons/ai';
import { BsPeopleFill } from 'react-icons/bs';
import { FaSignOutAlt, FaTasks, FaWrench } from 'react-icons/fa';
import { TbMoodCheck } from 'react-icons/tb';

import { getFirstName, getNameAcronym } from '@/lib/name/name';

function UserMenu({ children }: { children: React.ReactNode; }) {
    return (
        <div className="mx-1 my-4 flex items-center justify-center divide-y divide-gray-600">
            <div className="rounded-lg bg-indigo-950/90 px-5 py-1">
                {children}
            </div>
        </div>
    );
}

function HoverMark() {
    return (
        <motion.div layoutId="hovered" className="absolute top-0 h-full w-2">
            <div className="h-full w-full rounded bg-purple-900" />
        </motion.div>
    );
}

function SelectedBackground() {
    return (
        <motion.div layoutId="selected" className="absolute top-0 h-full w-full">
            <div className="h-full w-full rounded bg-indigo-950" />
        </motion.div>
    );
}

function NavigationLinks() {
    const selected = useSelectedLayoutSegment();
    const [hovered, setHovered] = useState<number>();

    const linkClasses = 'relative flex items-center rounded-lg p-2 pl-4 text-sm font-thin text-white focus:font-semibold';
    const iconClasses = 'mr-3 text-gray-400';
    const selectedHoverIndex = {
        home: 1,
        commitments: 2,
        network: 3,
        moods: 4
    }[selected || 'home'];

    return (
        <AnimatePresence mode="wait">
            <ul onMouseLeave={() => setHovered(selectedHoverIndex)} className="mt-4 space-y-2 border-t border-gray-700 pt-4">
                <li onMouseEnter={() => setHovered(1)} className="relative">
                    {selected === null ? <SelectedBackground /> : null}
                    {hovered === 1 ? <HoverMark /> : null}
                    <Link href="/" className={linkClasses}>
                        <AiFillHome size={18} className={iconClasses} />
                        <span>Home</span>
                    </Link>
                </li>
                <li onMouseEnter={() => setHovered(2)} className="relative">
                    {selected === 'commitments' ? <SelectedBackground /> : null}
                    {hovered === 2 ? <HoverMark /> : null}
                    <Link href="/commitments" className={linkClasses}>
                        <FaTasks size={18} className={iconClasses} />
                        <span>Commitments</span>
                    </Link>
                </li>
                <li onMouseEnter={() => setHovered(3)} className="relative">
                    {selected === 'network' ? <SelectedBackground /> : null}
                    {hovered === 3 ? <HoverMark /> : null}
                    <Link href="/network" className={linkClasses}>
                        <BsPeopleFill size={18} className={iconClasses} />
                        <span>Your Network</span>
                    </Link>
                </li>
                <li onMouseEnter={() => setHovered(4)} className="relative">
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

function useRouterEvents(callback: () => void) {
    const pathname = usePathname();
    const searchParams = useSearchParams();

    return useCallback(() => callback(), [pathname, searchParams, callback]);
}

export default function Content({ children }: { children: React.ReactNode }) {
    const { data: session } = useSession();
    const [isMobileOpen, setIsMobileOpen] = useState(false);
    const closeMobileMenu = () => setIsMobileOpen(false);
    useRouterEvents(closeMobileMenu);

    const nameAcronym = getNameAcronym(session?.user.name);
    const firstName = getFirstName(session?.user.name);
    const asideMobileStyle = clsx({ 'translate-x-0': isMobileOpen });

    return (
        <div>
            <button onClick={() => setIsMobileOpen(true)}
                data-drawer-target="sidenav"
                data-drawer-toggle="sidenav"
                aria-controls="sidenav"
                type="button"
                className="my-2 ml-3 inline-flex items-center rounded-lg p-2 text-sm text-gray-400 hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-600 sm:hidden"
            >
                <span className="sr-only">Open sidenav</span>
                <svg className="h-6 w-6" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                    <path clipRule="evenodd" fillRule="evenodd" d="M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zm0 10.5a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5a.75.75 0 01-.75-.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10z"></path>
                </svg>
            </button>

            <aside id="sidenav"
                className={`fixed left-0 top-0 z-40 h-screen w-56 -translate-x-full transition-transform sm:translate-x-0 ${asideMobileStyle}`}
                aria-label="Sidebar"
            >
                <div className="h-full overflow-y-auto px-3 py-4" style={{ background: 'rgb(22, 24, 29)' }}>
                    <div className="space-y-2 font-medium">
                        <div className="flex gap-2">
                            <div>
                                <span className="sr-only">Open user menu</span>
                                <Image className="rounded-full" width={32} height={32} src={session?.user.image ?? ''} alt={nameAcronym} />
                            </div>
                            <div role="none">
                                <p className="text-sm font-light text-white" role="none">{firstName ?? 'Me'}</p>
                                <p className="truncate text-xs font-light text-gray-300" role="none">{session?.user.email}</p>
                            </div>
                        </div>
                    </div>

                    <UserMenu>
                        <ul className="grid list-none grid-cols-3 gap-2 py-1" role="none">
                            <li className="cursor-pointer rounded-xl border-2 border-indigo-700 px-3 py-1 text-sm text-white">
                                <FaSignOutAlt onClick={() => signOut()} className="h-3 w-3" role="menuitem" />
                            </li>
                            <li className="cursor-pointer rounded-xl border-2 border-indigo-700 px-3 py-1 text-sm text-white">
                                <FaWrench onClick={() => signOut()} className="h-3 w-3" role="menuitem" />
                            </li>
                        </ul>
                    </UserMenu>

                    <NavigationLinks />
                </div>
            </aside>

            {isMobileOpen ? <div onClick={closeMobileMenu} className="absolute left-0 top-0 h-screen w-screen bg-slate-900 opacity-60"></div> : null}

            <main className="grow p-5 sm:ml-64">{children}</main>
        </div>
    );
}
