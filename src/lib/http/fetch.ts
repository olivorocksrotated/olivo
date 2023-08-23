import { HttpMethod } from './route';

export enum ResourcePath {
    Ai = 'ai',
    Notifications = 'notifications'
}

function getApiUrl(path: ResourcePath, attachToPath: string) {
    return `/api/${path}${attachToPath}`;
}

export function fetchFromApi({ method, path, attachToPath = '', body }: {
    method: HttpMethod,
    path: ResourcePath,
    attachToPath?: string,
    body?: any
}) {
    return fetch(getApiUrl(path, attachToPath), {
        method,
        headers: { 'Content-Type': 'application/json' },
        ...body ? { body: JSON.stringify(body) } : {}
    });
}
