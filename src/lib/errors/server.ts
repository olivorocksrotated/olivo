export interface ServerActionError {
    status: string;
    error: string;
}

export const unknownServerError: ServerActionError = { status: 'error', error: 'Unknown Server Error' };
