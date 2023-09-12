import { describe, expect, it } from 'vitest';

import { newEmptyArrayOfLength } from './new-empty-array-of-length';

describe('array', () => {
    describe('newEmptyArrayOfLength', () => {
        it('should return an array of the length of the parameter', () => {
            const expectedLength = 5;
            expect(newEmptyArrayOfLength(expectedLength).length).toBe(expectedLength);
        });

        it('should return an array filled with undefined', () => {
            const length = 5;
            const expectedArray = [undefined, undefined, undefined, undefined, undefined];
            expect(newEmptyArrayOfLength(length)).to.be.deep.equal(expectedArray);
        });

        it('should return an array that is iterable by its length', () => {
            const length = 5;
            const expectedMappedArray = [1, 2, 3, 4, 5];
            const array = newEmptyArrayOfLength(length).map((_, index) => index + 1);

            expect(array).to.be.deep.equal(expectedMappedArray);
        });
    });
});
