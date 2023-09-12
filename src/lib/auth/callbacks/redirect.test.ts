import { describe, expect, it } from 'vitest';

import redirectCallback from './redirect';

describe('lib auth', () => {
    describe('callbacks', () => {
        describe('redirect', () => {
            it('should return the base url', async () => {
                const expectedBaseUrl = 'base';

                const baseUrl = await redirectCallback({ baseUrl: expectedBaseUrl });

                expect(baseUrl).toStrictEqual(expectedBaseUrl);
            });
        });
    });
});
