import { add, sub } from 'date-fns';
import { beforeEach, describe, expect, it, vitest } from 'vitest';

import { isBetween } from './days';

describe('lib date', () => {
    describe('days', () => {
        describe('isBetween', () => {
            const now = new Date('2023-05-23T15:30:10Z');
            beforeEach(() => {
                vitest.useFakeTimers({ now });
            });

            it('should return true if the date is after the start date and before the end date', () => {
                expect(isBetween(
                    now,
                    sub(now, { days: 1 }),
                    add(now, { days: 1 })
                )).to.be.equal(true);
            });

            it('should return true if the date is the same day as the start date, even on a different hour', () => {
                expect(isBetween(
                    now,
                    sub(now, { hours: 1 }),
                    add(now, { days: 1 })
                )).to.be.equal(true);
            });

            it('should return true if the date is the same day as the end date, even on a different hour', () => {
                expect(isBetween(
                    now,
                    sub(now, { days: 1 }),
                    add(now, { hours: 1 })
                )).to.be.equal(true);
            });

            it('should return false if the date is not the same day and is not betweend the start and end dates', () => {
                expect(isBetween(
                    now,
                    add(now, { days: 1 }),
                    add(now, { days: 2 })
                )).to.be.equal(false);
            });
        });
    });
});
