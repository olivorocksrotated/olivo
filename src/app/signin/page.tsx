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

    const loader = showLoader ? <div><Loader/></div> : <></>;

    return (
        <div className="h-screen w-screen flex flex-col gap-20 py-64 items-center">
            <div className={`${ styles.logo } bg-gradient-to-r from-transparent via-purple-400 to-transparent rounded-md font-bold text-5xl px-64 py-5`}>
                OLIVO
            </div>
            <div className="flex gap-4">
                { isDevEnvironment() ? <LoginButton provider="credentials" onLoginAttempt={ handleLoginAttempt }>Login in Dev mode</LoginButton> : <></>}
                <LoginButton provider="github" onLoginAttempt={ handleLoginAttempt }>Login with Github</LoginButton>
            </div>
            { loader }
        </div>
    );
}
