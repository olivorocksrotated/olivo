import { getServerSession as nextAuthGetServerSession } from 'next-auth';
import { describe, expect, it, Mock } from 'vitest';

import { getServerSession } from './session';

describe('lib auth', () => {
    describe('session', () => {
        const nextAuthGetServerSessionMock = nextAuthGetServerSession as Mock;

        describe('getServerSession', () => {
            describe('without req and res', () => {
                it('should return a session if the session user has a unique identifier', async () => {
                    const expectedSession = { user: { id: 'id', email: 'uniqueEmail' } };
                    nextAuthGetServerSessionMock.mockResolvedValueOnce(expectedSession);

                    const session = await getServerSession();
                    expect(session).to.be.deep.equal(expectedSession);
                });

                it('should return an error if the session is not established', async () => {
                    const expectedError = new Error('Session is not established');
                    nextAuthGetServerSessionMock.mockResolvedValueOnce(null);

                    await expect(getServerSession()).rejects.toThrowError(expectedError);
                });
            });

            describe('with req and res', () => {
                it('should return a session if the session user has a unique identifier', async () => {
                    const expectedSession = { user: { id: 'id', email: 'uniqueEmail' } };
                    nextAuthGetServerSessionMock.mockResolvedValueOnce(expectedSession);

                    const req = {} as any;
                    const res = {} as any;
                    const session = await getServerSession(req, res);

                    expect(session).to.be.deep.equal(expectedSession);
                    expect(nextAuthGetServerSessionMock).toHaveBeenCalledWith(req, res, expect.any(Object));
                });

                it('should return an error if the session is not established', async () => {
                    const expectedError = new Error('Session is not established');
                    nextAuthGetServerSessionMock.mockResolvedValueOnce(null);

                    const req = {} as any;
                    const res = {} as any;
                    await expect(getServerSession(req, res)).rejects.toThrowError(expectedError);
                });
            });
        });
    });
});
