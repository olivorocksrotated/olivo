import { describe, expect, it } from 'vitest';

import { createServerActionErrorResponse, createServerActionSuccessResponse, createServerActionUnknownErrorResponse } from './response';
import { ServerActionError } from './types';

describe('lib server action', () => {
    describe('response', () => {
        describe('createServerActionErrorResponse', () => {
            it('should return a ServerActionError', () => {
                const type = 'type';
                const message = 'message';
                const expectedError: ServerActionError = { status: 'error', type, message };

                expect(createServerActionErrorResponse({ type, message })).toStrictEqual(expectedError);
            });
        });

        describe('createServerActionUnknownErrorResponse', () => {
            it('should return an UnknownErrorResponse ServerActionError', () => {
                const expectedError: ServerActionError = {
                    status: 'error',
                    type: 'UnknownServerError',
                    message: 'Something unexpected happen. Please try again.'
                };

                expect(createServerActionUnknownErrorResponse()).toStrictEqual(expectedError);
            });
        });

        describe('createServerActionSuccessResponse', () => {
            it('should return a ServerActionSuccess', () => {
                expect(createServerActionSuccessResponse()).toStrictEqual({ status: 'success' });
            });
        });
    });
});
