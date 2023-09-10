import { vi } from 'vitest';

vi.mock('next-auth', async () => ({
    ...await vi.importActual('next-auth') as any,
    getServerSession: vi.fn((): null | {} => null)
}));
