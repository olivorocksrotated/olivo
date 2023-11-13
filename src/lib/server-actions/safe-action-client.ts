import { createSafeActionClient } from 'next-safe-action';

import { defaultServerError, ServerActionError } from './errors';

export const action = createSafeActionClient({
    handleReturnedServerError(error: Error | ServerActionError): {
        serverError: string,
        type: string,
        error: Error
    } {
        return {
            serverError: error.message ?? defaultServerError.message,
            type: (error as ServerActionError).type ?? defaultServerError.type,
            error
        };
    }
});
