import { PrismockClient } from 'prismock';
import { vi } from 'vitest';

vi.mock('../prisma/client', async () => ({
    default: new PrismockClient()
}));
