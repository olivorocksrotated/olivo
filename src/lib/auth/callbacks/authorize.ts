// TODO Remove this shitty redirection workaround once NextAuth v5 is stable
// and hopefully suppporting this feature by default, as it was in v4.
// This logic ensures that whenever an unauthorized URL is hit,
// the user gets redirected to signin

const middlewareMatcher = new RegExp('/((?!signin|_next/static|_next/image|favicon.ico|api/inngest).*)', 'i');
export default async function authorizedCallback({ request, auth }: any) {
    const { pathname } = request.nextUrl;

    if (pathname.includes('/api/auth/')) {
        return true;
    }

    if (middlewareMatcher.test(pathname)) {
        return !!auth;
    }

    return true;
}
