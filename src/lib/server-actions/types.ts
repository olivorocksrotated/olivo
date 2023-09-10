export interface ServerActionSuccess {
    status: 'success';
}

export interface ServerActionError {
    status: 'error';
    type: string;
    message: string;
}

export type ServerActionResponse = ServerActionSuccess | ServerActionError;
