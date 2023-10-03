'use client';

import clsx from 'clsx';
import { AnimatePresence, motion } from 'framer-motion';

import NavigationLinks from './navigation-links';

interface Props {
    isOpen: boolean;
    onMobileBackdropClicked: () => void
}

export default function Sidenav({
    isOpen,
    onMobileBackdropClicked
}: Props) {
    const asideStyle = clsx(
        'fixed left-0 top-0 z-20 mt-12 h-screen w-44 -translate-x-full overflow-y-auto border-r border-neutral-900 bg-neutral-950 px-3 py-4 transition-transform',
        { 'translate-x-0': isOpen }
    );

    return (
        <>
            <aside aria-label="Side navigation" className={asideStyle}>
                <NavigationLinks />
            </aside>
            <AnimatePresence>
                {isOpen ? (
                    <motion.div
                        key="sidenav-backdrop"
                        onClick={onMobileBackdropClicked}
                        className="absolute left-0 top-0 z-10 h-screen w-screen bg-slate-900 sm:hidden"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 0.6 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.2 }}
                    >
                    </motion.div>) : null}
            </AnimatePresence>
        </>);
}
