export { auth as middleware } from './config/auth';

export const config = {
    matcher: ['/((?!signin|_next/static|_next/image|favicon.ico|api/inngest).*)'],
    pages: {
        signIn: '/signin'
    }
};
