'use client';

import { signOut } from 'next-auth/react';

import Button from '../components/button';

export default function LogoutButton() {
    return <Button onClick={() => signOut()}>Logout</Button>;
}
