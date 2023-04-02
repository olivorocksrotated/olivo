import { HttpMethod } from './route';

export enum ResourcePath {
    Reports = 'reports',
    Commitments = 'commitments'
}

function getApiUrl(path: ResourcePath, attachToPath: string) {
    return `/api/internal/${path}${attachToPath}`;
}

export function fetchFromApi({ method, path, attachToPath = '', body = {} }: {
    method: HttpMethod,
    path: ResourcePath,
    attachToPath?: string,
    body?: any
}) {
    return fetch(getApiUrl(path, attachToPath), {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body)
    });
}
