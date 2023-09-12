import { Session } from 'next-auth';
import { describe, expect, it } from 'vitest';

import sessionCallback from './session';

describe('lib auth', () => {
    describe('callbacks', () => {
        describe('session', () => {
            const session = { user: { name: 'userName' }, expires: 'soon' };
            const token = { sub: 'userId', isNewUser: true };

            it('should return the session information and the token properties inside the user property', async () => {
                const expectedSession = {
                    expires: 'soon',
                    user: {
                        name: session.user.name,
                        id: token.sub,
                        isNewUser: token.isNewUser
                    }
                };

                const returnedSession = await sessionCallback({ session: (session as Session), token });

                expect(returnedSession).toStrictEqual(expectedSession);
            });

            it('should default the user id to an empty string if the token does not contain any', async () => {
                const expectedSession = {
                    expires: 'soon',
                    user: {
                        name: session.user.name,
                        id: '',
                        isNewUser: token.isNewUser
                    }
                };

                const returnedSession = await sessionCallback({
                    session: (session as Session),
                    token: { ...token, sub: undefined }
                });

                expect(returnedSession).toStrictEqual(expectedSession);
            });
        });
    });
});
