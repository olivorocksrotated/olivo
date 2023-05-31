import { Prisma } from '@prisma/client';

export const UniqueConstraintFailed = 'P2002';

export function isPrismaError(error: any, errorCode: string) {
    return error instanceof Prisma.PrismaClientKnownRequestError && error.code === errorCode;
}

export function isUniqueConstraintFailed(error: any) {
    return isPrismaError(error, UniqueConstraintFailed);
}
