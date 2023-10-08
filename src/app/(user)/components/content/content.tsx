'use client';

import clsx from 'clsx';
import { useState } from 'react';

import Navigation, { defaultNavigationOpenState } from './navigation/navigation';

export default function Content({ children }: { children: React.ReactNode }) {
    const [isDesktopNavigationOpen, setIsDesktopNavigationOpen] = useState<boolean>(defaultNavigationOpenState.isDesktopOpen);

    const contentStyles = clsx(
        'h-screen overflow-y-auto pt-12 transition-all',
        { 'sm:ml-44': isDesktopNavigationOpen },
        { 'sm:ml-0': !isDesktopNavigationOpen }
    );

    return (
        <>
            <Navigation onNavigationOpenChanged={(newState) => setIsDesktopNavigationOpen(newState.isDesktopOpen)} />
            <main aria-label="Content" className={contentStyles}>
                <div className="p-5">{children}</div>
            </main>
        </>
    );
}
