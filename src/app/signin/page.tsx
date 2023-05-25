'use client';

import { useState } from 'react';

import { isDevEnvironment } from '@/lib/environment';

import Loader from '../components/loader';
import LoginButton from './login-btn';
import styles from './page.module.css';

export default function SignIn() {
    const [showLoader, setShowLoader] = useState(false);
    const handleLoginAttempt = () => {
        setShowLoader(true);
    };

    const loader = showLoader ? <div><Loader /></div> : undefined;

    return (
        <div className={`flex h-screen w-screen flex-col items-center gap-20 py-64 ${styles.background}`}>
            <div className={`${styles.logo} min-h-[90px] rounded-md bg-gradient-to-r from-transparent via-purple-400 to-transparent px-64 py-5 text-5xl font-bold`}>
                OLIVO
            </div>
            <div className="flex gap-4">
                {isDevEnvironment() ? <LoginButton provider="credentials" onLoginAttempt={handleLoginAttempt}>Login in Dev mode</LoginButton> : undefined}
                <LoginButton provider="github" onLoginAttempt={handleLoginAttempt}>Login with Github</LoginButton>
            </div>
            {loader}
        </div>
    );
}
