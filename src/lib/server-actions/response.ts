import { ServerActionError, ServerActionSuccess } from './types';

export function createServerActionErrorResponse({ type, message }: {
    type: string,
    message: string
}): ServerActionError {
    return { status: 'error', type, message };
}

export function createServerActionUnknownErrorResponse() {
    const unknownServerError = {
        type: 'UnknownServerError',
        message: 'Something unexpected happen. Please try again.'
    };

    return createServerActionErrorResponse(unknownServerError);
}

export function createServerActionSuccessResponse(): ServerActionSuccess {
    return { status: 'success' };
}
