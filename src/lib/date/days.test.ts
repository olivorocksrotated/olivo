import { add, sub } from 'date-fns';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';

import { findDateTimeframe, isBetween, todayAtLocalHour, todayAtMidnightUTC, todayAtZeroHourUTC } from './days';

describe('lib date', () => {
    describe('days', () => {
        const now = new Date('2023-05-23T15:30:10Z');

        beforeEach(() => {
            vi.useFakeTimers({ now });
        });

        afterEach(() => {
            vi.clearAllTimers();
        });

        describe('todayAtZeroHourUTC', () => {
            it('should return the current date at 0 hours', () => {
                const expectedDate = new Date('2023-05-23T00:00:00Z');
                expect(todayAtZeroHourUTC()).toStrictEqual(expectedDate);
            });
        });

        describe('todayAtMidnightUTC', () => {
            it('should return the current date at midnight, which is the first instant of the next day', () => {
                const expectedDate = new Date('2023-05-24T00:00:00Z');
                expect(todayAtMidnightUTC()).toStrictEqual(expectedDate);
            });
        });

        describe('todayAtLocalHour', () => {
            it('should return the current local date at 17 hours', () => {
                const todayAt17 = todayAtLocalHour(17);

                expect(todayAt17.moment.getFullYear()).toBe(2023);
                expect(todayAt17.moment.getMonth()).toBe(4);
                expect(todayAt17.moment.getDate()).toBe(23);
                expect(todayAt17.moment.getHours()).toBe(17);
                expect(todayAt17.moment.getMinutes()).toBe(0);
                expect(todayAt17.moment.getMilliseconds()).toBe(0);
                expect(todayAt17.timeUntilMoment).toBe(-1810000);
            });

            it('should return the current local date at 23 hours', () => {
                const todayAt17 = todayAtLocalHour(23);

                expect(todayAt17.moment.getFullYear()).toBe(2023);
                expect(todayAt17.moment.getMonth()).toBe(4);
                expect(todayAt17.moment.getDate()).toBe(23);
                expect(todayAt17.moment.getHours()).toBe(23);
                expect(todayAt17.moment.getMinutes()).toBe(0);
                expect(todayAt17.moment.getMilliseconds()).toBe(0);
                expect(todayAt17.timeUntilMoment).toBe(19790000);
            });
        });

        describe('isBetween', () => {
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

        describe('findDateTimeframe', () => {
            describe('sorted timeframes', () => {
                const timeframes = [
                    sub(now, { weeks: 4 }),
                    sub(now, { weeks: 3 }),
                    sub(now, { weeks: 2 }),
                    sub(now, { weeks: 1 }),
                    now
                ];

                it('should return the first found timeframe if the date is in between some of the provided dates', () => {
                    const dateToFind = sub(now, { weeks: 2, days: 2 });

                    const expectedTimeframe = {
                        startTimeframe: { index: 1, date: timeframes[1] },
                        endTimeframe: { index: 2, date: timeframes[2] }
                    };

                    expect(findDateTimeframe({ dateToFind, timeframes })).toStrictEqual(expectedTimeframe);
                });

                it('should return null if if the date is after all the provided dates', () => {
                    const dateToFind = add(now, { days: 2 });
                    expect(findDateTimeframe({ dateToFind, timeframes })).toBe(null);
                });

                it('should return null if if the date is before the provided dates', () => {
                    const dateToFind = sub(now, { months: 6 });
                    expect(findDateTimeframe({ dateToFind, timeframes })).toBe(null);
                });
            });

            describe('unsorted timeframes', () => {
                const timeframes = [
                    now,
                    sub(now, { months: 2 }),
                    sub(now, { weeks: 4 }),
                    sub(now, { weeks: 1 }),
                    sub(now, { weeks: 3 })
                ];

                it('should return the first found timeframe if the date is in between some of the provided dates', () => {
                    const dateToFind = sub(now, { weeks: 1, days: 2 });

                    const expectedTimeframe = {
                        startTimeframe: { index: 2, date: timeframes[2] },
                        endTimeframe: { index: 3, date: timeframes[3] }
                    };

                    expect(findDateTimeframe({ dateToFind, timeframes })).toStrictEqual(expectedTimeframe);
                });

                it('should return null if the date is not in between some of the provided dates going from the start of the array to the end', () => {
                    const dateToFind = sub(now, { days: 2 });
                    expect(findDateTimeframe({ dateToFind, timeframes })).toBe(null);
                });

                it('should return null if if the date is after all the provided dates', () => {
                    const dateToFind = add(now, { years: 2 });
                    expect(findDateTimeframe({ dateToFind, timeframes })).toBe(null);
                });

                it('should return null if if the date is before the provided dates', () => {
                    const dateToFind = sub(now, { years: 6 });
                    expect(findDateTimeframe({ dateToFind, timeframes })).toBe(null);
                });
            });
        });
    });
});
