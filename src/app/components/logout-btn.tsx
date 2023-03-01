'use client';

import { signOut } from 'next-auth/react';
import Button from './button';

export default function LogoutButton() {
    return <Button onClick={() => { return signOut(); }}>Logout</Button>;
}
