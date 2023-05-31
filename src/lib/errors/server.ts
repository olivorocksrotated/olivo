export interface ServerActionSuccess {
    status: 'success';
}

export interface ServerActionError {
    status: 'error';
    type: string;
    message: string;
}

export type ServerActionResponse = ServerActionSuccess | ServerActionError;


export function createServerActionErrorResponse({ type, message }: {
    type: string,
    message: string
}): ServerActionError {
    return { status: 'error', type, message };
}

export function createServerActionSuccessResponse(): ServerActionSuccess {
    return { status: 'success' };
}

export function isServerActionError(data: any): boolean {
    return data?.status === 'error';
}

export function getServerActionErrorMessage(data: any): string {
    return data?.status?.message ?? '';
}

export const unknownServerError = { type: 'UnknownServerError', message: 'Something unexpected happen. Please try again.' };
