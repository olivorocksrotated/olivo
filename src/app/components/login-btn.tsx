"use client";

import { signIn } from 'next-auth/react';

export default function LoginButton() {
    return <button className='px-4 py-1 rounded border border-solid border-zinc-600' onClick={() => signIn("github", { callbackUrl: '' })}>Login with Github</button>
}
