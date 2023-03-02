import { isDevEnvironment } from '@/lib/environment';

import LoginButton from './login-btn';

const GithubLoginButton = () => <LoginButton>Login with Github</LoginButton>;

export default function SignIn() {
    return (
        <div className="h-screen w-screen flex justify-center items-center">
            { isDevEnvironment() ?
                <div className="flex flex-col gap-4">
                    <LoginButton provider="credentials">Login in Dev mode</LoginButton>
                    <GithubLoginButton></GithubLoginButton>
                </div> :
                <GithubLoginButton></GithubLoginButton>
            }
        </div>
    );
}
