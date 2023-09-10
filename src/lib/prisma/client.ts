import { PrismaClient } from '@prisma/client';

import { isDevEnvironment } from '../environment';

// Remove warn for Next.js in development: https://www.prisma.io/docs/guides/database/troubleshooting-orm/help-articles/nextjs-prisma-client-dev-practices

const globalForPrisma = global as unknown as { prisma: PrismaClient };

const prisma = globalForPrisma.prisma || new PrismaClient({ log: ['info', 'warn', 'error'] });

if (isDevEnvironment()) {
    globalForPrisma.prisma = prisma;
}

export default prisma;
