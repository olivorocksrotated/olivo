'use client';

import { signIn } from 'next-auth/react';

import Button from '../../components/button';

interface Props extends React.ButtonHTMLAttributes<HTMLButtonElement>{
    provider?: string;
    onLoginAttempt?: (provider: string) => void;
    children: React.ReactNode;
}

export default function LoginButton({
    provider = 'github',
    onLoginAttempt = () => undefined,
    children,
    ...props
}: Props) {
    const handleClick = () => {
        signIn(provider);
        onLoginAttempt(provider);
    };

    return <Button onClick={handleClick} {...props}>{children}</Button>;
}
