import { Prisma } from '@prisma/client';

const UniqueConstraintFailed = 'P2002';

export function isUniqueConstraintFailed(error: any) {
    return error instanceof Prisma.PrismaClientKnownRequestError && error.code === UniqueConstraintFailed;
}
