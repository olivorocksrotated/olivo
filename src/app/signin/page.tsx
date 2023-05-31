'use client';

import { useSearchParams } from 'next/navigation';
import { useState } from 'react';
import { FcGoogle } from 'react-icons/fc';
import { VscGithub } from 'react-icons/vsc';

import { isDevEnvironment } from '@/lib/environment';

import packageInfo from '../../../package.json';
import Loader from '../components/loader';
import LoginButton from './components/login-btn';
import styles from './page.module.css';

const errors: { [errorId: string]: string } = {
    OAuthAccountNotLinked: 'Something went wrong. Maybe you already signed in with a different provider?'
};

export default function SignIn() {
    const [showLoader, setShowLoader] = useState(false);
    const authCallbackError = useSearchParams()?.get('error');

    const handleLoginAttempt = () => {
        setShowLoader(true);
    };

    return (
        <div className={`flex h-screen w-screen flex-col items-center gap-20 py-64 ${styles.background}`}>
            <div className="absolute right-4 top-4 text-neutral-300">version {packageInfo.version}</div>
            <div className={`${styles.logo} min-h-[90px] rounded-md bg-gradient-to-r from-transparent via-purple-400 to-transparent px-64 py-5 text-5xl font-bold`}>
                OLIVO
            </div>
            <div className="flex flex-col gap-4 sm:flex-row">
                <LoginButton provider="github" onLoginAttempt={handleLoginAttempt}>
                    <div className="flex items-center gap-2"><VscGithub size={20} /> Login with Github</div>
                </LoginButton>
                <LoginButton provider="google" onLoginAttempt={handleLoginAttempt}>
                    <div className="flex items-center gap-2"><FcGoogle size={20} /> Login with Google</div>
                </LoginButton>
            </div>
            {isDevEnvironment() ? <LoginButton provider="credentials" onLoginAttempt={handleLoginAttempt}>Login in Dev mode</LoginButton> : null}
            {authCallbackError ? <div className="text-red-400">{errors[authCallbackError]}</div> : null}
            {showLoader ? <div><Loader /></div> : null}
        </div>
    );
}
