import { ServerActionError, ServerActionResponse } from './types';

export const defaultServerErrorMessage = 'Oh no, something went wrong!';

export function isServerActionError(response: ServerActionResponse | null): response is ServerActionError {
    return response?.status === 'error';
}

export function getServerActionErrorMessage(response: ServerActionError | null): string {
    return response?.message ?? '';
}
