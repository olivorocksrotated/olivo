import { add, sub } from 'date-fns';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';

import { isOverdue } from './filter';

describe('commitments filter', () => {
    describe('isOverdue', () => {
        const initialDate = new Date('2023-05-23T15:30:10Z');
        const isOverdueWithDate = isOverdue(initialDate);

        beforeEach(() => {
            vi.useFakeTimers({ now: initialDate });
        });

        afterEach(() => {
            vi.clearAllTimers();
        });

        describe('true', () => {
            it('should return true if the commitment should be done before the reference date and it is not done yet', () => {
                const commitment = {
                    doneBy: sub(initialDate, { days: 1 }),
                    doneAt: null
                };

                expect(isOverdueWithDate(commitment)).to.be.equal(true);
            });

            it('should return true if the commitment was done after the expected date', () => {
                const commitment = {
                    doneBy: sub(initialDate, { days: 2 }),
                    doneAt: sub(initialDate, { days: 1 })
                };

                expect(isOverdueWithDate(commitment)).to.be.equal(true);
            });
        });

        describe('false', () => {
            it('should return false if the commitment should be done after the reference date', () => {
                const commitment = {
                    doneBy: add(initialDate, { days: 1 }),
                    doneAt: null
                };

                expect(isOverdueWithDate(commitment)).to.be.equal(false);
            });

            it('should return false if the commitment should be done by the reference date, regardless of the hour', () => {
                const commitment = {
                    doneBy: sub(initialDate, { hours: 2 }),
                    doneAt: null
                };

                expect(isOverdueWithDate(commitment)).to.be.equal(false);
            });

            it('should return false if the commitment was done before the expected date', () => {
                const commitment = {
                    doneBy: sub(initialDate, { days: 1 }),
                    doneAt: sub(initialDate, { days: 2 })
                };

                expect(isOverdueWithDate(commitment)).to.be.equal(false);
            });

            it('should return false if the commitment was done on the expected date', () => {
                const commitment = {
                    doneBy: new Date('2023-04-23T15:30:10Z'),
                    doneAt: new Date('2023-04-23T16:30:10Z')
                };

                expect(isOverdueWithDate(commitment)).to.be.equal(false);
            });
        });
    });
});
