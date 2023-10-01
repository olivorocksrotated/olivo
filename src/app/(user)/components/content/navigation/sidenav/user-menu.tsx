import { signOut } from 'next-auth/react';

import Button from '@/app/components/ui/button/button';

export default function UserMenu() {
    return (
        <div className="py-2">
            <ul className="flex" role="none">
                <li>
                    <Button label="Sign out" role="menuitem" size="xs" onClick={() => signOut()} />
                </li>
            </ul>
        </div>
    );
}
