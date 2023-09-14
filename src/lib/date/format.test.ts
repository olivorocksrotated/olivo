import { sub } from 'date-fns';
import { beforeEach, describe, expect, it, vitest } from 'vitest';

import { getRelativeDate, getRelativeDateWithoutTime } from './format';

describe('lib date', () => {
    describe('format', () => {
        const initialDate = new Date('2023-05-23T15:30:10Z');

        beforeEach(() => {
            vitest.useFakeTimers({ now: initialDate });
        });

        describe('getRelativeDate', () => {
            it('should return "Today at..."', () => {
                const today = new Date();
                expect(getRelativeDate(today, initialDate)).to.contain('Today at');
            });

            it('should return "Yesterday at..."', () => {
                const yesterday = sub(initialDate, { days: 1 });
                expect(getRelativeDate(yesterday, initialDate)).to.contain('Yesterday at');
            });

            it('should return the date in the full dd/MM/yyyy format "23/03/2023"', () => {
                const farInTime = sub(initialDate, { months: 2 });
                expect(getRelativeDate(farInTime, initialDate)).to.be.equal('23/03/2023');
            });
        });

        describe('getRelativeDateWithoutTime', () => {
            it('should return "Today"', () => {
                const today = new Date();
                expect(getRelativeDateWithoutTime(today, initialDate)).to.be.equal('Today');
            });

            it('should return "Yesterday"', () => {
                const yesterday = sub(initialDate, { days: 1 });
                expect(getRelativeDateWithoutTime(yesterday, initialDate)).to.be.equal('Yesterday');
            });

            it('should return the date in the full dd/MM/yyyy format "23/03/2023"', () => {
                const farInTime = sub(initialDate, { months: 2 });
                expect(getRelativeDateWithoutTime(farInTime, initialDate)).to.be.equal('23/03/2023');
            });
        });
    });
});
