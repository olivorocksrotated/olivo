export { default } from 'next-auth/middleware';

export const config = {
    matcher: ['/((?!signin|_next/static|_next/image|favicon.ico).*)'],
    pages: {
        signIn: '/signin'
    }
};
