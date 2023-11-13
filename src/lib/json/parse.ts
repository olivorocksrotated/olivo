export function safeJSONParse<T, X extends string = string>(value: X): T | undefined {
    try {
        return JSON.parse(value) as T;
    } catch (error) {
        console.error('Safe JSON parse failed', error);

        return undefined;
    }
}
