import { Prisma } from '@prisma/client';
import { KnownErrorParams } from '@prisma/client/runtime/library';
import { describe, expect, it } from 'vitest';

import { isPrismaError, isUniqueConstraintFailed, UniqueConstraintFailed } from './errors';

describe('lib prisma', () => {
    describe('errors', () => {
        describe('isPrismaError', () => {
            it('should return true if the error is a PrismaClientKnownRequestError and the error code is the expected one', () => {
                const params: KnownErrorParams = { code: 'errorCode', clientVersion: '1' };
                const error = new Prisma.PrismaClientKnownRequestError('error', params);

                expect(isPrismaError(error, params.code)).toBe(true);
            });

            it('should return false if the error is not a PrismaClientKnownRequestError', () => {
                const error = new Error('error');

                expect(isPrismaError(error, '')).toBe(false);
            });

            it('should return false if the error is a PrismaClientKnownRequestError and the error code is not the expected one', () => {
                const params: KnownErrorParams = { code: 'errorCode', clientVersion: '1' };
                const error = new Prisma.PrismaClientKnownRequestError('error', { ...params, code: 'another code' });

                expect(isPrismaError(error, params.code)).toBe(false);
            });
        });

        describe('isUniqueConstraintFailed', () => {
            it('should return true if the error is a PrismaClientKnownRequestError UniqueConstraintFailed', () => {
                const params: KnownErrorParams = { code: UniqueConstraintFailed, clientVersion: '1' };
                const error = new Prisma.PrismaClientKnownRequestError('error', params);

                expect(isUniqueConstraintFailed(error)).toBe(true);
            });

            it('should return false if the error is not a PrismaClientKnownRequestError', () => {
                const error = new Error('error');

                expect(isUniqueConstraintFailed(error)).toBe(false);
            });

            it('should return false if the error is a PrismaClientKnownRequestError and the error code is not UniqueConstraintFailed', () => {
                const params: KnownErrorParams = { code: 'UniqueConstraintFailed', clientVersion: '1' };
                const error = new Prisma.PrismaClientKnownRequestError('error', { ...params, code: 'another code' });

                expect(isUniqueConstraintFailed(error)).toBe(false);
            });
        });
    });
});
