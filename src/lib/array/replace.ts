export function replace<T>(
    source: T[],
    updatedItem: T,
    comparator: (item: T, index?: number) => boolean
): T[] {
    return source.map((item, index) => (comparator(item, index) ? updatedItem : item));
}
