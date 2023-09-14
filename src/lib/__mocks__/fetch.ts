import { vi } from 'vitest';

export const fetchMock = vi.spyOn(globalThis, 'fetch').mockImplementation(async () => new Response());
