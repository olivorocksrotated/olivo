import { createSafeActionClient } from 'next-safe-action';

import { defaultServerError, ServerActionError } from './errors';

export const action = createSafeActionClient({
    handleReturnedServerError(error): {
        serverError: string,
        type: string,
        error: Error
    } {
        if (error instanceof ServerActionError) {
            return {
                serverError: error.message,
                type: error.type,
                error
            };
        }

        return {
            serverError: defaultServerError.message,
            type: defaultServerError.type,
            error
        };
    }
});
