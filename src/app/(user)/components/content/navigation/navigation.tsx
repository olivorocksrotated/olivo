'use client';

import { usePathname, useSearchParams } from 'next/navigation';
import { useCallback, useEffect, useState } from 'react';

import useDetectWindowSize from './hooks/useDetectWindowSize';
import Sidenav from './sidenav/sidenav';
import Topnav from './topnav/topnav';


export default function Navigation() {
    const [isOpen, setIsOpen] = useState(true);
    const { isTiny: isMobile } = useDetectWindowSize();
    const url = `${usePathname()}${useSearchParams()}`;

    const closeSidenav = useCallback(() => setIsOpen(false), []);

    useEffect(() => {
        if (isMobile) {
            closeSidenav();
        }
    }, [isMobile, url, closeSidenav]);

    return (
        <>
            <Topnav onSidenavButtonClicked={() => setIsOpen((previous) => !previous)} />
            <Sidenav isOpen={isOpen} onMobileBackdropClicked={closeSidenav} />
        </>
    );
}
