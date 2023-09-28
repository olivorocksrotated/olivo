import { add, sub } from 'date-fns';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';

import { groupCommitmentsByOverdue, TimedCommitment } from './group';

describe('lib commitments', () => {
    describe('group', () => {
        describe('groupCommitmentsByOverdue', () => {
            const now = new Date();

            beforeEach(() => {
                vi.useFakeTimers({ now });
            });
            afterEach(() => {
                vi.clearAllTimers();
            });

            it('should return empty groups if there are no commitments', () => {
                const commitments: TimedCommitment[] = [];
                const expectedGroups = { overdue: [], onTime: [] };

                expect(groupCommitmentsByOverdue({
                    commitments,
                    referenceDate: now
                })).toStrictEqual(expectedGroups);
            });

            it('should return the commitments grouped by overdue', () => {
                const overdueCommitments: TimedCommitment[] = [
                    { doneBy: sub(now, { days: 2 }), doneAt: null },
                    { doneBy: sub(now, { days: 2 }), doneAt: now }
                ];
                const onTimeCommitments: TimedCommitment[] = [
                    { doneBy: sub(now, { days: 2 }), doneAt: sub(now, { days: 3 }) },
                    { doneBy: add(now, { days: 2 }), doneAt: now },
                    { doneBy: add(now, { days: 2 }), doneAt: null }
                ];
                const expectedGroups = {
                    overdue: overdueCommitments,
                    onTime: onTimeCommitments
                };

                expect(groupCommitmentsByOverdue({
                    commitments: [...overdueCommitments, ...onTimeCommitments],
                    referenceDate: now
                })).toStrictEqual(expectedGroups);
            });
        });
    });
});
