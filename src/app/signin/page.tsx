'use client';

import { useState } from 'react';
import { FcGoogle } from 'react-icons/fc';
import { VscGithub } from 'react-icons/vsc';

import { isDevEnvironment } from '@/lib/environment';

import Loader from '../components/loader';
import LoginButton from './components/login-btn';
import styles from './page.module.css';

export default function SignIn() {
    const [showLoader, setShowLoader] = useState(false);
    const handleLoginAttempt = () => {
        setShowLoader(true);
    };

    return (
        <div className={`flex h-screen w-screen flex-col items-center gap-20 py-64 ${styles.background}`}>
            <div className={`${styles.logo} min-h-[90px] rounded-md bg-gradient-to-r from-transparent via-purple-400 to-transparent px-64 py-5 text-5xl font-bold`}>
                OLIVO
            </div>
            <div className="flex gap-4">
                <LoginButton provider="github" onLoginAttempt={handleLoginAttempt}>
                    <div className="flex items-center gap-2"><VscGithub size={20} /> Login with Github</div>
                </LoginButton>
                <LoginButton provider="google" onLoginAttempt={handleLoginAttempt}>
                    <div className="flex items-center gap-2"><FcGoogle size={20} /> Login with Google</div>
                </LoginButton>
            </div>
            {isDevEnvironment() ? <LoginButton provider="credentials" onLoginAttempt={handleLoginAttempt}>Login in Dev mode</LoginButton> : null}
            {showLoader ? <div><Loader /></div> : null}
        </div>
    );
}
