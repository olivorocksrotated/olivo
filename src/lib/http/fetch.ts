import { getApiUrl } from '../api';
import { HttpMethod } from './route';

export enum ResourcePath {
    Reports = 'reports',
    Commitments = 'commitments'
}

export function fetchFromApi({ method, path, body }: {
    method: HttpMethod,
    path: ResourcePath
    body: any
}) {
    return fetch(getApiUrl(path), {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body)
    });
}
