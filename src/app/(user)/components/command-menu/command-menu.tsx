'use client';

import { Command } from 'cmdk';
import { useRouter } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';

import { links, NavigationLink } from '@/app/navigation';

import styles from './command-menu.module.css';

function LinkCommand({ link }: { link: NavigationLink }) {
    const router = useRouter();
    function navigateTo(path: string) {
        return () => router.push(path);
    }

    return (
        <Command.Item onSelect={navigateTo(link.path)}>
            <span className="text-neutral-400">{link.icon}</span>
            <span>{link.title}</span>
        </Command.Item>
    );
}

export default function CommandMenu() {
    const [open, setOpen] = useState(false);
    const containerElement = useRef(null);

    useEffect(() => {
        const onKeyDown = (e: KeyboardEvent) => {
            if (e.key === 'k' && e.metaKey) {
                setOpen((isOpen) => !isOpen);
            }
        };

        document.addEventListener('keydown', onKeyDown);

        return () => document.removeEventListener('keydown', onKeyDown);
    }, []);

    return (
        <>
            <Command.Dialog open={open} onOpenChange={setOpen} container={containerElement.current as any} label="Global Command Menu">
                <Command.Input />
                <Command.List>
                    <Command.Empty>No results found.</Command.Empty>

                    <Command.Group heading="Go to">
                        {links.map((link) => <LinkCommand key={link.id} link={link}></LinkCommand>)}
                    </Command.Group>
                </Command.List>
            </Command.Dialog>
            <div className={styles['command-menu']} ref={containerElement}></div>
        </>
    );
}
