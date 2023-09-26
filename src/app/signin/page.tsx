'use client';

import { useSearchParams } from 'next/navigation';
import { signIn } from 'next-auth/react';
import { useState } from 'react';
import { FcGoogle } from 'react-icons/fc';
import { VscGithub } from 'react-icons/vsc';

import { isDevEnvironment } from '@/lib/environment';

import Button from '../components/ui/button/button';
import Loader from '../components/ui/loader/loader';
import styles from './page.module.css';

const errors: { [errorId: string]: string } = {
    OAuthAccountNotLinked: 'Maybe you already signed in with a different provider?',
    Callback: 'Maybe you already signed in with a different provider?'
};

export default function SignIn() {
    const [showLoader, setShowLoader] = useState(false);
    const authCallbackError = useSearchParams()?.get('error');

    const handleLoginAttempt = (provider: 'github' | 'google' | 'credentials') => {
        setShowLoader(true);
        signIn(provider);
    };

    return (
        <div className={`flex h-screen w-screen flex-col items-center gap-20 py-64 ${styles.background}`}>
            <div className={`${styles.logo} min-h-[90px] rounded-md bg-gradient-to-r from-transparent via-purple-400 to-transparent px-64 py-5 text-5xl font-bold`}>
                OLIVO
            </div>
            <div className="flex flex-col gap-4 sm:flex-row">
                <Button
                    label="Sign in with Github"
                    onClick={() => handleLoginAttempt('github')}
                    disabled={showLoader}
                    icon={VscGithub}
                    size="md"
                />
                <Button
                    label="Sign in with Google"
                    onClick={() => handleLoginAttempt('google')}
                    disabled={showLoader}
                    icon={FcGoogle}
                    size="md"
                />
            </div>
            {isDevEnvironment() ? <Button label="Sign in dev mode" size="md" onClick={() => handleLoginAttempt('credentials')} disabled={showLoader} /> : null}
            {authCallbackError ? (
                <div className="text-center text-red-400">
                    <div>Something went wrong.</div>
                    <div>{errors[authCallbackError] ?? 'Please try again.'}</div>
                </div>) : null}
            {showLoader ? <div><Loader intent="standalone" size="md" /></div> : null}
        </div>
    );
}
