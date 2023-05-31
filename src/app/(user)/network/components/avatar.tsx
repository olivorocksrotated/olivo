'use client';

import * as UiAvatar from '@radix-ui/react-avatar';

import { Connection } from '@/lib/network/types';

import { getNameAcronym } from '../../../../lib/name/name';

type Props = { user: Connection['user']; };

export default function Avatar({ user }: Props) {
    const nameAcronym = getNameAcronym(user.name);

    return (
        <UiAvatar.Root className="inline-flex h-20 w-20 select-none items-center justify-center overflow-hidden rounded align-middle">
            <UiAvatar.Image src={user.image} alt={user.name} className="h-full w-full rounded object-cover" />
            <UiAvatar.Fallback delayMs={600} className="flex h-full w-full items-center justify-center rounded border border-indigo-400">{nameAcronym}</UiAvatar.Fallback>
        </UiAvatar.Root>
    );
}
