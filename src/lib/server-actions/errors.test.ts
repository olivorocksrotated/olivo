import { describe, expect, it } from 'vitest';

import { getServerActionErrorMessage, isServerActionError } from './errors';
import { ServerActionError } from './types';

describe('lib server actions', () => {
    describe('errors', () => {
        describe('isServerActionError', () => {
            it('should return true if the response is a server action error', () => {
                expect(isServerActionError({
                    status: 'error',
                    type: 'type',
                    message: 'message'
                })).toBe(true);
            });

            it('should return false if the response is not a server action error', () => {
                expect(isServerActionError(new Error('error') as any)).toBe(false);
            });

            it('should return false if the response is null', () => {
                expect(isServerActionError(null)).toBe(false);
            });
        });

        describe('getServerActionErrorMessage', () => {
            it('should return the message of the error', () => {
                const error: ServerActionError = {
                    status: 'error',
                    type: 'type',
                    message: 'message'
                };

                expect(getServerActionErrorMessage(error)).toBe('message');
            });

            it('should return an empty string if the error is null', () => {
                expect(getServerActionErrorMessage(null)).toBe('');
            });
        });
    });
});
