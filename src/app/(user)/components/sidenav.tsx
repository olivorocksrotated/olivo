'use client';

import * as UiAvatar from '@radix-ui/react-avatar';
import { useSession } from 'next-auth/react';

import LogoutButton from './logout-btn';

export default function Sidenav() {
    const { data: session, status } = useSession();

    console.log('---> user', session, status);

    return (
        <div>
            <LogoutButton></LogoutButton>
            <div>
                <div>Olivo</div>
                <div>
                    <UiAvatar.Root className="inline-flex h-20 w-20 select-none items-center justify-center overflow-hidden rounded align-middle">
                        <UiAvatar.Image src={' '} alt={' '} className="h-full w-full rounded object-cover" />
                        <UiAvatar.Fallback delayMs={600} className="flex h-full w-full items-center justify-center rounded border border-indigo-400">{' '}</UiAvatar.Fallback>
                    </UiAvatar.Root>
                </div>
            </div>
        </div>
    );
}
