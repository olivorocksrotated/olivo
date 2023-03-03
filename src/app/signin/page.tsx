import { isDevEnvironment } from '@/lib/environment';

import LoginButton from './login-btn';
import styles from './page.module.css';

const GithubLoginButton = () => <LoginButton>Login with Github</LoginButton>;

export default function SignIn() {
    return (
        <div className="h-screen w-screen flex flex-col gap-20 py-64 items-center">
            <div className={`${ styles.logo } bg-gradient-to-r from-transparent via-purple-400 to-transparent rounded-md font-bold text-5xl px-64 py-5`}>
                OLIVO
            </div>
            { isDevEnvironment() ?
                <div className="flex gap-4">
                    <LoginButton provider="credentials">Login in Dev mode</LoginButton>
                    <GithubLoginButton></GithubLoginButton>
                </div> :
                <GithubLoginButton></GithubLoginButton>
            }
        </div>
    );
}
