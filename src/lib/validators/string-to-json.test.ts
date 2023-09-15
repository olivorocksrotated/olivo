import { describe, expect, it } from 'vitest';
import { ZodError } from 'zod';

import { stringToJSON } from './string-to-json';

describe('lib validators', () => {
    describe('string to json', () => {
        describe('stringToJSON', () => {
            it('should return a parsed string as JSON', () => {
                const value = [{ a: 'b' }];
                const stringifiedValue = JSON.stringify(value);

                const result = stringToJSON.parse(stringifiedValue);

                expect(result).toStrictEqual(value);
            });

            it('should return a validation error if the parsed string is not a valid JSON', () => {
                const value = 'Invalid JSON';

                const result = stringToJSON.safeParse(value);
                const error = (result as any).error as ZodError;

                expect(error.issues).toStrictEqual([{
                    code: 'custom',
                    message: 'Invalid JSON',
                    path: []
                }]);
            });
        });
    });
});
