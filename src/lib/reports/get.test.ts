import { describe, expect, it } from 'vitest';

import { prismaMock } from '../tests/prisma.fake';
import { getReportsByManager } from './get';

describe('lib reports', () => {
    describe('get', () => {
        describe('getReportsByManager', () => {
            it('should return all the reports of the manager', async () => {
                const expectedReport = { name: 'name' };
                const managerId = '1';
                const relations: any[] = [{ managerId, report: expectedReport }];
                prismaMock.reportRelation.findMany.mockResolvedValueOnce(relations);

                const reports = await getReportsByManager(managerId);

                expect(reports).to.be.deep.equal([expectedReport]);
            });
        });
    });
});

