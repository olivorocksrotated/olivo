'use client';

import { usePathname, useSearchParams } from 'next/navigation';
import { useCallback, useEffect, useState } from 'react';

import Sidenav from './sidenav/sidenav';
import Topnav from './topnav/topnav';


export default function Navigation() {
    const [isSidenavCollapsed, setIsSidenavCollapsed] = useState(false);
    const [isMobileOpen, setIsMobileOpen] = useState(false);

    const url = `${usePathname()}${useSearchParams()}`;
    const closeMobileMenu = useCallback(() => setIsMobileOpen(false), []);
    useEffect(() => closeMobileMenu(), [url, closeMobileMenu]);

    return (
        <>
            <Topnav
                onSidenavButtonClicked={() => setIsSidenavCollapsed((previous) => !previous)}
                onMobileSidenavClicked={() => setIsMobileOpen((previous) => !previous)}
            />
            <Sidenav
                isSidenavCollapsed={isSidenavCollapsed}
                isMobileOpen={isMobileOpen}
                onMobileBackdropClicked={closeMobileMenu}
            />
        </>
    );
}
