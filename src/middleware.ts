export { auth as middleware } from './config/auth';

export const config = {
    matcher: [
        /*
        * Match all request paths except for the ones starting with:
        * - signin (signin page)
        * - _next/static (static files)
        * - _next/image (image optimization files)
        * - favicon.ico (favicon file)
        * - api/inngest (events api)
        */
        '/((?!signin|_next/static|_next/image|favicon.ico|api/inngest).*)'
    ],
    missing: [
        { type: 'header', key: 'next-router-prefetch' },
        { type: 'header', key: 'purpose', value: 'prefetch' }
    ]
};
