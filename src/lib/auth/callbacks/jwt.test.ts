import { JWT } from 'next-auth/jwt';
import { describe, expect, it } from 'vitest';

import { userCreatedEvent } from '@/flows/signup/events';
import { inngest } from '@/lib/inngest/client';

import jwtCallback from './jwt';

describe('lib auth', () => {
    describe('callbacks', () => {
        describe('jwt', () => {
            const token = { name: 'tokenName' } as unknown as JWT;
            const user = { id: 'userId' };
            const trigger = 'signIn';

            it('should return a JWT token with a isNewUser flag set to true', async () => {
                const isNewUser = true;
                const expectedToken = { ...token, isNewUser };

                const jwtToken = await jwtCallback({
                    token,
                    user,
                    trigger,
                    isNewUser,
                    account: null
                });

                expect(jwtToken).toStrictEqual(expectedToken);
            });

            it('should return a JWT token with a isNewUser flag set to false', async () => {
                const isNewUser = false;
                const expectedToken = { ...token, isNewUser };

                const jwtToken = await jwtCallback({
                    token,
                    user,
                    trigger,
                    isNewUser,
                    account: null
                });

                expect(jwtToken).toStrictEqual(expectedToken);
            });

            it('should return a JWT token with a isNewUser flag set to false if there is no isNewUser flag', async () => {
                const expectedToken = { ...token, isNewUser: false };

                const jwtToken = await jwtCallback({
                    token,
                    user,
                    trigger,
                    account: null
                });

                expect(jwtToken).toStrictEqual(expectedToken);
            });

            describe('signIn', () => {
                it('should not send a user created event during sign in', async () => {
                    await jwtCallback({
                        token,
                        user,
                        trigger: 'signIn',
                        account: null
                    });

                    expect(inngest.send).not.toHaveBeenCalled();
                });
            });

            describe('signUp', () => {
                it('should send a user created event during sign up', async () => {
                    await jwtCallback({
                        token,
                        user,
                        trigger: 'signUp',
                        account: null
                    });

                    expect(inngest.send).toHaveBeenCalledWith({
                        name: userCreatedEvent.name,
                        data: { userId: user.id }
                    });
                });
            });
        });
    });
});
