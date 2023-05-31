import { User } from '@prisma/client';

type NonNullProperties<T> = {
    [P in keyof T]: NonNullable<T[P]>;
};

export type ConnectionUserFields = Pick<User, 'id' | 'image' | 'name'>;
export type Connection = { id: string, user: NonNullProperties<ConnectionUserFields> };
