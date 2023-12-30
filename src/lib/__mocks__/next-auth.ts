import { vi } from 'vitest';

vi.mock('next-auth', async () => ({
    ...await vi.importActual('next-auth') as any,
    auth: vi.fn((): null | {} => null),
    signIn: vi.fn((): null | {} => null),
    signOut: vi.fn((): null | {} => null)
}));

vi.mock('@/config/auth', () => ({
    auth: vi.fn((): null | {} => null),
    signIn: vi.fn((): null | {} => null),
    signOut: vi.fn((): null | {} => null)
}));
