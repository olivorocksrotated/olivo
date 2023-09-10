import { HttpMethod } from './types';

export enum ResourcePath {
    Ai = 'ai',
    Notifications = 'notifications'
}

export function getApiUrl(path: ResourcePath, attachToPath: string): string {
    return `/api/${path}${attachToPath}`;
}

export function fetchFromApi({ method, path, attachToPath = '', body }: {
    method: HttpMethod,
    path: ResourcePath,
    attachToPath?: string,
    body?: any
}): Promise<Response> {
    return fetch(getApiUrl(path, attachToPath), {
        method,
        headers: { 'Content-Type': 'application/json' },
        ...body ? { body: JSON.stringify(body) } : {}
    });
}
