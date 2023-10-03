'use client';

import Image from 'next/image';
import { signOut, useSession } from 'next-auth/react';

import Button from '@/app/components/ui/button/button';
import { useCloseUiComponent } from '@/app/components/ui/hooks/useCloseUiComponent';
import Popover from '@/app/components/ui/popover/popover';
import { getFirstName, getNameAcronym } from '@/lib/name/name';

import Notifications from '../../../notifications/notifications';

export default function UserMenu() {
    const { data: session } = useSession();
    const nameAcronym = getNameAcronym(session?.user.name);
    const firstName = getFirstName(session?.user.name);

    const [isClosed] = useCloseUiComponent();

    return (
        <div className="flex items-center gap-3 pr-2">
            <Notifications />
            <div className="relative h-8 min-h-[2rem] w-8 min-w-[2rem]">
                <span className="sr-only">Open user menu</span>
                <Popover
                    align="end"
                    sideOffset={4}
                    close={isClosed}
                    openComponent={
                        <Image
                            className="min-h-[1.75rem] min-w-[1.75rem] cursor-pointer rounded-full object-cover hover:outline hover:outline-indigo-600"
                            src={session?.user.image ?? ''}
                            width={28}
                            height={28}
                            alt={nameAcronym}
                        />
                    }
                >
                    <ul className="space-y-4">
                        <li>
                            <p className="text-sm font-light text-white" role="none">{firstName ?? 'Me'}</p>
                            <p className="truncate text-xs font-light text-gray-300" role="none">{session?.user.email}</p>
                        </li>
                        <li>
                            <Button label="Sign out" w="full" size="xs" onClick={() => signOut()} />
                        </li>
                    </ul>
                </Popover>
            </div>
        </div>
    );
}
