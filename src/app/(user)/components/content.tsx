'use client';

import clsx from 'clsx';
import { AnimatePresence, motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { signOut, useSession } from 'next-auth/react';
import { useState } from 'react';
import { AiFillHome } from 'react-icons/ai';
import { BsPeopleFill } from 'react-icons/bs';
import { FaTasks } from 'react-icons/fa';
import { TbMoodCheck } from 'react-icons/tb';

import { getFirstName, getNameAcronym } from '@/lib/name/name';

function UserMenu({ children, isOpen, id }: { children: React.ReactNode; isOpen: boolean; id: string }) {
    return (
        <AnimatePresence mode="wait">
            {isOpen ? (
                <motion.div initial={{
                    height: 0,
                    opacity: 0
                }}
                animate={{
                    height: 'auto',
                    opacity: 1,
                    transition: {
                        height: { duration: 0.4 },
                        opacity: {
                            duration: 0.25,
                            delay: 0.15
                        }
                    }
                }}
                exit={{
                    height: 0,
                    opacity: 0,
                    transition: {
                        height: { duration: 0.4 },
                        opacity: { duration: 0.25 }
                    }
                }}
                key="dropdown-user"
                className="divide-y divide-gray-600 rounded bg-gray-700 text-base shadow"
                id={id}
                >
                    {children}
                </motion.div>
            ) : null}
        </AnimatePresence>
    );
}

export default function Content({ children }: { children: React.ReactNode }) {
    const { data: session } = useSession();
    const [isMobileOpen, setIsMobileOpen] = useState(false);
    const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);

    const nameAcronym = getNameAcronym(session?.user.name);
    const firstName = getFirstName(session?.user.name);
    const asideMobileStyle = clsx({ 'translate-x-0': isMobileOpen });

    const closeMobileMenu = () => setIsMobileOpen(false);

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
                <div className="h-full overflow-y-auto bg-gray-900 px-3 py-4">
                    <ul className="space-y-2 font-medium">
                        <li>
                            <div className="flex gap-2">
                                <div>
                                    <button type="button"
                                        onClick={() => setIsUserMenuOpen((previous) => !previous)}
                                        className="mb-4 flex rounded-full bg-gray-800 text-sm focus:ring-4 focus:ring-gray-600"
                                        aria-expanded="false"
                                        data-dropdown-toggle="dropdown-user"
                                    >
                                        <span className="sr-only">Open user menu</span>
                                        <Image className="rounded-full" width={32} height={32} src={session?.user.image ?? ''} alt={nameAcronym} />
                                    </button>
                                </div>
                                <div className="" role="none">
                                    <p className="text-sm font-light text-white" role="none">{firstName ?? 'Me'}</p>
                                    <p className="truncate text-xs font-light text-gray-300" role="none">{session?.user.email}</p>
                                </div>
                            </div>
                            <UserMenu id="dropdown-user" isOpen={isUserMenuOpen}>
                                <ul className="list-none py-1" role="none">
                                    <li>
                                        <Link href="#" onClick={() => signOut()} className="block px-4 py-2 text-sm font-light text-gray-300 hover:bg-gray-600 hover:text-white" role="menuitem">Logout</Link>
                                    </li>
                                </ul>
                            </UserMenu>
                        </li>
                        <li className="mt-4 space-y-2 border-t border-gray-700 pt-4">
                            <Link href="/" onClick={closeMobileMenu} className="flex items-center rounded-lg p-2 text-sm font-thin text-white hover:bg-gray-700">
                                <AiFillHome size={18} className="mr-3 text-gray-400" />
                                <span>Home</span>
                            </Link>
                        </li>
                        <li>
                            <Link href="/commitments" onClick={closeMobileMenu} className="flex items-center rounded-lg p-2 text-sm font-thin text-white hover:bg-gray-700">
                                <FaTasks size={18} className="mr-3 text-gray-400" />
                                <span>Commitments</span>
                            </Link>
                        </li>
                        <li>
                            <Link href="/reports" onClick={closeMobileMenu} className="flex items-center rounded-lg p-2 text-sm font-thin text-white hover:bg-gray-700">
                                <BsPeopleFill size={18} className="mr-3 text-gray-400" />
                                <span>Reports</span>
                            </Link>
                        </li>
                        <li>
                            <Link href="/moods" onClick={closeMobileMenu} className="flex items-center rounded-lg p-2 text-sm font-thin text-white hover:bg-gray-700">
                                <TbMoodCheck size={18} className="mr-3 text-gray-400" />
                                <span>Your mood</span>
                            </Link>
                        </li>
                    </ul>
                </div>
            </aside>

            {isMobileOpen ? <div onClick={closeMobileMenu} className="absolute left-0 top-0 h-screen w-screen bg-slate-900 opacity-60"></div> : null}

            <main className="grow p-5 sm:ml-64">{children}</main>
        </div>
    );
}
