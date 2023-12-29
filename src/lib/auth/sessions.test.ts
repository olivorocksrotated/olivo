import { describe, expect, it, Mock } from 'vitest';

import { auth } from '../../config/auth';
import { getServerSession } from './session';

describe('lib auth', () => {
    describe('session', () => {
        const authMock = auth as Mock;

        describe('getServerSession', () => {
            describe('without req and res', () => {
                it('should return a session if the session user has a unique identifier', async () => {
                    const expectedSession = { user: { id: 'id', email: 'uniqueEmail' } };
                    authMock.mockResolvedValueOnce(expectedSession);

                    const session = await getServerSession();
                    expect(session).to.be.deep.equal(expectedSession);
                });

                it('should return an error if the session is not established', async () => {
                    const expectedError = new Error('Session is not established');
                    authMock.mockResolvedValueOnce(null);

                    await expect(getServerSession()).rejects.toThrowError(expectedError);
                });
            });

            describe('with req and res', () => {
                it('should return a session if the session user has a unique identifier', async () => {
                    const expectedSession = { user: { id: 'id', email: 'uniqueEmail' } };
                    authMock.mockResolvedValueOnce(expectedSession);

                    const req = {} as any;
                    const res = {} as any;
                    const session = await getServerSession(req, res);

                    expect(session).to.be.deep.equal(expectedSession);
                    expect(authMock).toHaveBeenCalledWith(req, res);
                });

                it('should return an error if the session is not established', async () => {
                    const expectedError = new Error('Session is not established');
                    authMock.mockResolvedValueOnce(null);

                    const req = {} as any;
                    const res = {} as any;
                    await expect(getServerSession(req, res)).rejects.toThrowError(expectedError);
                });
            });
        });
    });
});
