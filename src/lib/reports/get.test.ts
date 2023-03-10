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
                const expectedReports = [
                    { id: '2', image: 'image2', name: 'name2' },
                    { id: '3', image: 'image3', name: 'name3' }
                ];
                prisma.user.create({ data: expectedReports[0] });
                prisma.user.create({ data: expectedReports[1] });
                prisma.reportRelation.create({ data: { managerId, reportId: expectedReports[0].id } });
                prisma.reportRelation.create({ data: { managerId, reportId: expectedReports[1].id } });

                const reports = await getReportsByManager(managerId);

                expect(reports).to.be.deep.equal(expectedReports);
            });

            it('should return default values if the report does not have name and image', async () => {
                const managerId = '1';
                const expectedReport = { id: '4', image: null, name: null };
                prisma.user.create({ data: expectedReport });
                prisma.reportRelation.create({ data: { managerId, reportId: expectedReport.id } });

                const reports = await getReportsByManager(managerId);

                expect(reports).to.deep.contain({ id: '4', image: '', name: '' });
            });
        });
    });
});

