'use client';

import { signIn } from 'next-auth/react';

export default function LoginButton({ provider = 'github', children }: { provider?: string; children: React.ReactNode; }) {
    return <button className='px-4 py-1 rounded border border-solid border-zinc-600' onClick={() => signIn(provider)}>{ children }</button>
}
