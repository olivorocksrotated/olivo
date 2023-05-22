import clsx from 'clsx';
import { signOut } from 'next-auth/react';
import { IoLogOutOutline } from 'react-icons/io5';

export default function UserMenu() {
    const itemStyle = clsx(
        'cursor-pointer rounded border border-slate-500 px-3 py-1 text-gray-400 transition',
        'hover:bg-slate-700 hover:text-white'
    );

    return (
        <div className="py-2">
            <ul className="flex" role="none">
                <li onClick={() => signOut()} title="Sign out" className={itemStyle}>
                    <IoLogOutOutline size={14} role="menuitem" />
                </li>
            </ul>
        </div>
    );
}
