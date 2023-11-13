import { describe, expect, it } from 'vitest';

import { createServerActionError } from './errors';

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
    });
});
