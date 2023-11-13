import { defaultServerError, ServerActionError } from './errors';
import { ServerActionSuccess } from './types';

export function createServerActionError({ type, message }: {
    type: string,
    message: string
}): ServerActionError {
    return new ServerActionError(message, type);
}

export function createServerActionUnknownError() {
    return createServerActionError(defaultServerError);
}

export function createServerActionSuccessResponse(): ServerActionSuccess {
    return { status: 'success' };
}
