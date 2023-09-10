import { PrismockClient } from 'prismock';
import { vi } from 'vitest';

vi.mock('../prisma', async () => ({
    default: new PrismockClient()
}));
