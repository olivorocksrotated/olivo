import { describe, expect, it } from 'vitest';

import { fetchMock } from '../__mocks__/fetch';
import { fetchFromApi, getApiUrl, ResourcePath } from './fetch';
import { HttpMethod } from './types';

describe('lib http', () => {
    describe('fetch', () => {
        describe('getApiUrl', () => {
            it('should return the fully built api url', () => {
                const attached = '/something?query1=1&query2=2';
                const expectedUrl = `/api/ai${attached}`;

                expect(getApiUrl(ResourcePath.Ai, attached)).toBe(expectedUrl);
            });

            it('should return the api url without anything attached', () => {
                const expectedUrl = '/api/ai';
                expect(getApiUrl(ResourcePath.Ai, '')).toBe(expectedUrl);
            });
        });

        describe('fetchFromApi', () => {
            it('should make a fetch call to the right path', async () => {
                const attached = '/something?query1=1&query2=2';
                const expectedPath = `/api/ai${attached}`;

                const fetchParameters = {
                    method: HttpMethod.GET,
                    path: ResourcePath.Ai,
                    attachToPath: attached
                };

                await fetchFromApi(fetchParameters);

                expect(fetchMock).toHaveBeenCalledWith(
                    expectedPath,
                    expect.any(Object)
                );
            });

            it('should make a fetch call without anything attached', async () => {
                const expectedPath = '/api/ai';

                const fetchParameters = {
                    method: HttpMethod.GET,
                    path: ResourcePath.Ai
                };

                await fetchFromApi(fetchParameters);

                expect(fetchMock).toHaveBeenCalledWith(
                    expectedPath,
                    expect.any(Object)
                );
            });

            it('should make a fetch call with the json header set', async () => {
                const method = HttpMethod.GET;

                const fetchParameters = {
                    method,
                    path: ResourcePath.Ai
                };

                await fetchFromApi(fetchParameters);

                expect(fetchMock).toHaveBeenCalledWith(
                    expect.any(String),
                    {
                        method,
                        headers: { 'Content-Type': 'application/json' }
                    }
                );
            });

            it('should make a fetch call with a stringified body', async () => {
                const method = HttpMethod.GET;

                const fetchParameters = {
                    method,
                    path: ResourcePath.Ai,
                    body: { hello: 'there' }
                };

                await fetchFromApi(fetchParameters);

                expect(fetchMock).toHaveBeenCalledWith(
                    expect.any(String),
                    {
                        method,
                        headers: { 'Content-Type': 'application/json' },
                        body: '{\"hello\":\"there\"}'
                    }
                );
            });
        });
    });
});
