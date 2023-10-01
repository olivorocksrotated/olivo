'use client';

import clsx from 'clsx';
import { AnimatePresence, motion } from 'framer-motion';

import useDetectWindowSize from '../hooks/useDetectWindowSize';
import NavigationLinks from './navigation-links';

interface Props {
    isSidenavCollapsed: boolean;
    isMobileOpen: boolean;
    onMobileBackdropClicked: () => void
}

export default function Sidenav({
    isSidenavCollapsed,
    isMobileOpen,
    onMobileBackdropClicked
}: Props) {
    const { isTiny: isMobile } = useDetectWindowSize();
    const asideStyle = clsx(
        'fixed left-0 top-0 z-30 mt-12 h-screen w-44 -translate-x-full overflow-y-auto border-r border-neutral-900 bg-neutral-950 px-3 py-4 transition-transform',
        'sm:translate-x-0',
        { 'translate-x-0': isMobileOpen }
    );

    return (
        <>
            <motion.aside
                aria-label="Side navigation"
                className={asideStyle}
                animate={{
                    width: isMobile ? '176px' : isSidenavCollapsed ? '52px' : '176px'
                }}
            >
                <NavigationLinks />
            </motion.aside>
            <AnimatePresence>
                {isMobileOpen ? (
                    <motion.div
                        key="sidenav-backdrop"
                        onClick={onMobileBackdropClicked}
                        className="absolute left-0 top-0 z-10 h-screen w-screen bg-slate-900"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 0.6 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.2 }}
                    >
                    </motion.div>) : null}
            </AnimatePresence>
        </>);
}
