import { describe, expect, it } from 'vitest';

import { createServerActionError, createServerActionUnknownError, defaultServerError } from './errors';

describe('lib server action', () => {
    describe('errors', () => {
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
    });
});
