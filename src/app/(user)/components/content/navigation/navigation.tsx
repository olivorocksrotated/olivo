'use client';

import { usePathname, useSearchParams } from 'next/navigation';
import { useCallback, useEffect, useState } from 'react';

import Sidenav from './sidenav/sidenav';
import Topnav from './topnav/topnav';

export interface NavigationOpen {
    isDesktopOpen: boolean;
    isMobileOpen: boolean;
}

export const defaultNavigationOpenState: NavigationOpen = {
    isDesktopOpen: true,
    isMobileOpen: false
};

interface Props {
    onNavigationOpenChanged: (state: NavigationOpen) => void
}

export default function Navigation({ onNavigationOpenChanged }: Props) {
    const [navigationOpen, setNavigationOpen] = useState<NavigationOpen>(defaultNavigationOpenState);
    const url = `${usePathname()}${useSearchParams()}`;

    const setNavigationState = useCallback((stateUpdate: Partial<NavigationOpen>) => {
        setNavigationOpen((previous) => ({ ...previous, ...stateUpdate }));
    }, []);

    useEffect(() => {
        setNavigationState({ isMobileOpen: false });
    }, [url, setNavigationState]);

    useEffect(() => {
        onNavigationOpenChanged(navigationOpen);
    }, [navigationOpen, onNavigationOpenChanged]);

    return (
        <>
            <Topnav
                onDesktopSidenavClicked={() => setNavigationState({ isDesktopOpen: !navigationOpen.isDesktopOpen })}
                onMobileSidenavClicked={() => setNavigationState({ isMobileOpen: !navigationOpen.isMobileOpen })}
            />
            <Sidenav
                navigationOpen={navigationOpen}
                onMobileBackdropClicked={() => setNavigationState({ isMobileOpen: false })}
            />
        </>
    );
}
