import { vi } from 'vitest';

vi.mock('@/lib/inngest/client', async () => ({
    ...await vi.importActual('@/lib/inngest/client') as object,
    inngest: {
        send: vi.fn(),
        createFunction: vi.fn()
    }
}));
