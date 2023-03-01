'use client';

import { signIn } from 'next-auth/react';
import Button from '../components/button';

export default function LoginButton({ provider = 'github', children }: { provider?: string; children: React.ReactNode; }) {
    return <Button onClick={() => { return signIn(provider); }}>{ children }</Button>;
}
