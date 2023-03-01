'use client';

import { signOut } from 'next-auth/react';

export default function LogoutButton() {
    return <button className="px-4 py-1 rounded border border-solid border-zinc-600" onClick={() => {
        return signOut();
    }}>Logout</button>;
}
