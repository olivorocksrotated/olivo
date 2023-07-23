import { describe, expect, it } from 'vitest';

import { replace } from './replace';

describe('lib array', () => {
    describe('replace', () => {
        it('should replace an item by condition', () => {
            const updatedItem = 'updated item';
            const sourceArray = ['first-item', 'second-item', 'third-item', 'another-item'];
            const expectedArray = ['first-item', updatedItem, 'third-item', 'another-item'];

            const replacedArray = replace(sourceArray, updatedItem, (item) => item === 'second-item');

            expect(replacedArray).to.be.deep.equal(expectedArray);
        });

        it('should replace multiple items by condition', () => {
            const updatedItem = { id: 'updated', extraProperty: true };
            const sourceArray = [{ id: 'valid' }, { id: 'invalid' }, { id: 'invalid' }, { id: 'valid-too' }];
            const expectedArray = [
                { id: 'valid' },
                { id: 'updated', extraProperty: true },
                { id: 'updated', extraProperty: true },
                { id: 'valid-too' }
            ];

            const replacedArray = replace(sourceArray, updatedItem, (item) => item.id === 'invalid');

            expect(replacedArray).to.be.deep.equal(expectedArray);
        });

        it('should replace an item based on the index', () => {
            const updatedItem = 'updated item';
            const sourceArray = ['first-item', 'second-item', 'third-item', 'another-item'];
            const expectedArray = [updatedItem, 'second-item', 'third-item', 'another-item'];

            const replacedArray = replace(sourceArray, updatedItem, (_, index) => index === 0);

            expect(replacedArray).to.be.deep.equal(expectedArray);
        });
    });
});
