import { describe, expect, it } from 'vitest';

import { styleState } from './styleState';

describe('styling', () => {
    describe('styleState', () => {
        it('should attach the style to every class', () => {
            const className = 'text-right another-class w-26';
            const state = 'disabled';

            const expectedClassName = 'disabled:text-right disabled:another-class disabled:w-26';

            expect(styleState(state, className)).to.be.equal(expectedClassName);
        });

        it('should attach the style to just one class', () => {
            const className = 'text-right';
            const state = 'disabled';

            const expectedClassName = 'disabled:text-right';

            expect(styleState(state, className)).to.be.equal(expectedClassName);
        });
    });
});
