import { vi } from 'vitest';

vi.mock('next/cache', async () => ({
    revalidatePath: vi.fn()
}));
