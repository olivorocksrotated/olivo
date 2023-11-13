export class ServerActionError extends Error {
    type: string;

    constructor(message: string, type: string) {
        super(message);
        this.type = type;
    }
}

export const defaultServerError = new ServerActionError('Something unexpected happen. Please try again.', 'UnknownServerError');

export function createServerActionError({ type, message }: {
    type: string,
    message: string
}): ServerActionError {
    return new ServerActionError(message, type);
}
