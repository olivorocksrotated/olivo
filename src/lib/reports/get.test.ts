import { generatePrismock } from 'prismock';
import { describe, expect, it, vi } from 'vitest';

import prisma from '../prisma';
import { getReportsByManager } from './get';

vi.mock('../prisma', async () => ({
    default: await generatePrismock()
}));

describe('lib reports', () => {
    describe('get', () => {
        describe('getReportsByManager', () => {
            it('should return all the reports of the manager', async () => {
                const managerId = '1';
                const expectedReport = { id: '2', name: 'name' };
                prisma.user.create({ data: expectedReport });
                prisma.reportRelation.create({ data: { managerId, reportId: expectedReport.id } });

                const reports = await getReportsByManager(managerId);

                expect(reports).to.be.deep.equal([expectedReport]);
            });
        });
    });
});

