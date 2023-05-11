'use client';

import * as UiAvatar from '@radix-ui/react-avatar';
import { signOut, useSession } from 'next-auth/react';

import { getFirstName, getNameAcronym } from '@/lib/reports/name';

export default function Sidenav() {
    const { data: session } = useSession();
    const nameAcronym = getNameAcronym(session?.user.name ?? '');
    const firstName = getFirstName(session?.user.name);

    return (
        <div>
            <div className="flex gap-2">
                <div>
                    <UiAvatar.Root className="inline-flex h-7 w-7 select-none items-center justify-center overflow-hidden rounded align-middle">
                        <UiAvatar.Image src={session?.user.image ?? ''} alt={session?.user.name ?? 'Me'} className="rounded object-cover" />
                        <UiAvatar.Fallback delayMs={600} className="flex h-full w-full items-center justify-center rounded border border-indigo-400">
                            {nameAcronym}
                        </UiAvatar.Fallback>
                    </UiAvatar.Root>
                </div>
                <div className="flex flex-col">
                    <div className="font-normal leading-none">{firstName ?? 'Me'}</div>
                    <div className="text-sm leading-tight text-slate-300">
                        <span className="cursor-pointer hover:underline" onClick={() => signOut()}>Logout</span>
                    </div>
                </div>
            </div>
        </div>
    );
}
