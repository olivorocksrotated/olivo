export interface ServerActionSuccess {
    status: 'success';
}

export interface ServerActionError {
    status: 'error';
    error: string;
}

export type ServerActionResponse = ServerActionSuccess | ServerActionError;


export const unknownServerError: ServerActionError = { status: 'error', error: 'Unknown Server Error' };
