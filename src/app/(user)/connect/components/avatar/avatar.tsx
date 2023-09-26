'use client';

import * as UiAvatar from '@radix-ui/react-avatar';
import clsx from 'clsx';

import { Connection } from '@/lib/network/types';

import { getNameAcronym } from '../../../../../lib/name/name';
import { AvatarSize } from './types';

type Props = {
    user: Connection['user'];
    size?: AvatarSize;
};

export default function Avatar({ user, size = AvatarSize.Small }: Props) {
    const nameAcronym = getNameAcronym(user.name);

    const sizeClasses = clsx({
        'w-20 h-20': size === AvatarSize.Small,
        'w-40 h-40': size === AvatarSize.Big
    });

    return (
        <UiAvatar.Root className={`${sizeClasses} inline-flex select-none items-center justify-center overflow-hidden rounded align-middle`}>
            <UiAvatar.Image src={user.image} alt={user.name} className="h-full w-full rounded object-cover" />
            <UiAvatar.Fallback delayMs={600} className="flex h-full w-full items-center justify-center rounded border border-neutral-400">{nameAcronym}</UiAvatar.Fallback>
        </UiAvatar.Root>
    );
}
