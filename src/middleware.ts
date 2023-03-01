export { default } from 'next-auth/middleware';

export const config = {
    matcher: ['/'],
    pages: {
        signIn: '/signin'
    }
};
