'use client';

import { signIn } from 'next-auth/react';

import Button from '../../components/button';

interface Props {
    provider?: string;
    onLoginAttempt?: (provider: string) => void;
    children: React.ReactNode;
}

export default function LoginButton({
    provider = 'github',
    onLoginAttempt = () => undefined,
    children
}: Props) {
    const handleClick = () => {
        signIn(provider);
        onLoginAttempt(provider);
    };

    return <Button onClick={handleClick}>{children}</Button>;
}
