import { generatePrismock } from 'prismock';
import { describe, expect, it, vi } from 'vitest';

import prisma from '../prisma';
import { getNetwork } from './get';

vi.mock('../prisma', async () => ({
    default: await generatePrismock()
}));

vi.mock('next/headers', async () => ({
    ...await vi.importActual('next/headers') as any,
    cookies: vi.fn().mockReturnValue({
        getAll: () => [
            // fake user cookies
            { name: 'next-auth.session-token',
                value: 'eyJhbGciOiJkaXIiLCJlbmMiOiJBMjU2R0NNIn0.._H9VIrWXurNPYcG-.aZDn0Gbp3KTdrb4gEiT1dN9VN5IpAtn442TtaiSy5k9hrA3Sg4Zt4nW74UPJJWikJAhcoGOnD7O9J5lFZLZ6S3kjefpb2n5j38Nbr-18XOId4kMKk2zz21pRHNFIJr9AU0WzKESC5Wi5V6R3haOohNAEJqVkoOIhhuRm70cahXkTgiCz57jA.9Z7wPEbYaVaYa56CgI_8cg' }
        ]
    }),
    headers: vi.fn().mockReturnValue([])
}));

describe('lib network', () => {
    describe('get', () => {
        describe('getNetwork', () => {
            it('should return the network of the user', async () => {
                const managerId = '1';
                const expectedReports = [
                    { id: '2', image: 'image2', name: 'name2' },
                    { id: '3', image: 'image3', name: 'name3' }
                ];
                prisma.user.create({ data: expectedReports[0] });
                prisma.user.create({ data: expectedReports[1] });
                prisma.reportRelation.create({ data: { managerId, reportId: expectedReports[0].id } });
                prisma.reportRelation.create({ data: { managerId, reportId: expectedReports[1].id } });

                const reports = await getNetwork();

                expect(reports).to.be.deep.equal(expectedReports);
            });

            it('should return default values if the report does not have name and image', async () => {
                const managerId = '1';
                const expectedReport = { id: '4', image: null, name: null };
                prisma.user.create({ data: expectedReport });
                prisma.reportRelation.create({ data: { managerId, reportId: expectedReport.id } });

                const reports = await getNetwork();

                expect(reports).to.deep.contain({ id: '4', image: '', name: '' });
            });
        });
    });
});

