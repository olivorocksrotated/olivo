import { describe, expect, it } from 'vitest';

import { defaultServerError } from './errors';
import { createServerActionError, createServerActionSuccessResponse, createServerActionUnknownError } from './response';

describe('lib server action', () => {
    describe('response', () => {
        describe('createServerActionError', () => {
            it('should return a ServerActionError', () => {
                const type = 'type';
                const message = 'message';

                const error = createServerActionError({ type, message });

                expect(error.message).toBe(message);
                expect(error.type).toBe(type);
            });
        });

        describe('createServerActionUnknownError', () => {
            it('should return an UnknownErrorResponse ServerActionError', () => {
                const error = createServerActionUnknownError();

                expect(error.message).toBe(defaultServerError.message);
                expect(error.type).toBe(defaultServerError.type);
            });
        });

        describe('createServerActionSuccessResponse', () => {
            it('should return a ServerActionSuccess', () => {
                expect(createServerActionSuccessResponse()).toStrictEqual({ status: 'success' });
            });
        });
    });
});
