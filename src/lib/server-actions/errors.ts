import { ServerActionError, ServerActionResponse } from './types';

export function isServerActionError(response: ServerActionResponse | null): response is ServerActionError {
    return response?.status === 'error';
}

export function getServerActionErrorMessage(response: ServerActionError): string {
    return response?.message ?? '';
}
