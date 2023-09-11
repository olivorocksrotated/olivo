import { vi } from 'vitest';

vi.mock('@/lib/inngest/client', () => ({
    inngest: {
        send: vi.fn(),
        createFunction: vi.fn()
    }
}));
