import LoginButton from '../components/login-btn';

function isDevEnvironment() {
  return process.env.NEXT_PUBLIC_VERCEL_ENV !== 'production';
}

const GithubLoginButton = () => <LoginButton>Login with Github</LoginButton>;

export default async function SignIn() {
    return (
        <div className='h-screen w-screen flex justify-center items-center'>
          { isDevEnvironment() ?
            <div className='flex flex-col gap-4'>
              <LoginButton provider='credentials'>Login in Dev mode</LoginButton>
              <GithubLoginButton></GithubLoginButton>
            </div>:
            <GithubLoginButton></GithubLoginButton>
          }
        </div>
    );
}
