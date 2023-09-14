import { describe, expect, it } from 'vitest';

import { hashString } from './hash-string';

describe('lib hash', () => {
    describe('hash-string', () => {
        it('should return a hashed string', () => {
            const value: string = 'hello there';
            const expectedHash = '1791114646';

            expect(hashString(value)).toBe(expectedHash);
        });
    });
});
