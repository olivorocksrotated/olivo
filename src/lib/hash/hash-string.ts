/* eslint-disable no-bitwise */
export function hashString(value: string): string {
    let hash = 0;
    for (let i = 0, len = value.length; i < len; i++) {
        const chr = value.charCodeAt(i);
        hash = (hash << 5) - hash + chr;
        hash |= 0;
    }

    return hash.toString();
}
