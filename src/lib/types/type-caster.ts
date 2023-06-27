export function forceCast<T, U>(value: T): U {
    return value as unknown as U;
}
