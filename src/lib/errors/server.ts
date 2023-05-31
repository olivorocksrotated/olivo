export interface ServerActionSuccess {
    status: 'success';
}

export interface ServerActionError {
    status: 'error';
    type: string;
    error: string;
}

export type ServerActionResponse = ServerActionSuccess | ServerActionError;


export function createServerActionErrorResponse({ type, message }: {
    type: string,
    message: string
}): ServerActionError {
    return { status: 'error', type, error: message };
}

export function createServerActionSuccessResponse(): ServerActionSuccess {
    return { status: 'success' };
}

export const unknownServerError = { type: 'UnknownServerError', message: 'Something unexpected happen. Please try again.' };
