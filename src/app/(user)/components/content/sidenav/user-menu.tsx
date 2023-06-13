import { signOut } from 'next-auth/react';
import { IoLogOutOutline } from 'react-icons/io5';

import IconButton from '@/app/components/ui/icon-button/icon-button';

export default function UserMenu() {
    return (
        <div className="py-2">
            <ul className="flex" role="none">
                <li onClick={() => signOut()} title="Sign out">
                    <IconButton icon={IoLogOutOutline} label="Sign out" role="menuitem" size="xs" />
                </li>
            </ul>
        </div>
    );
}
