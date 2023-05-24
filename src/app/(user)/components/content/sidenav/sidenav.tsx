'use client';

import clsx from 'clsx';
import Image from 'next/image';
import { usePathname, useSearchParams } from 'next/navigation';
import { useSession } from 'next-auth/react';
import { useCallback, useEffect, useState } from 'react';

import { getFirstName, getNameAcronym } from '@/lib/name/name';

import NavigationLinks from './navigation-links';
import UserMenu from './user-menu';

export default function Sidenav() {
    const { data: session } = useSession();
    const nameAcronym = getNameAcronym(session?.user.name);
    const firstName = getFirstName(session?.user.name);

    const [isMobileOpen, setIsMobileOpen] = useState(false);
    const asideMobileStyle = clsx({ 'translate-x-0': isMobileOpen });
    const url = `${usePathname()}${useSearchParams()}`;

    const closeMobileMenu = useCallback(() => setIsMobileOpen(false), []);
    useEffect(() => closeMobileMenu(), [url, closeMobileMenu]);

    return (
        <>
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

                    <UserMenu />

                    <NavigationLinks />
                </div>
            </aside>

            {isMobileOpen ? <div onClick={closeMobileMenu} className="absolute left-0 top-0 h-screen w-screen bg-slate-900 opacity-60"></div> : null}
        </>);
}
