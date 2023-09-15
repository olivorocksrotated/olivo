import { describe, expect, it } from 'vitest';

import { forceCast } from './type-caster';

describe('lib types', () => {
    describe('type caster', () => {
        describe('forceCast', () => {
            it('should force the type of a variable regardless of its compatibility', () => {
                const castedValue: number[] = forceCast<number, number[]>(1);

                expect(typeof castedValue).toBe('number');
            });
        });
    });
});
