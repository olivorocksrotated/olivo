import { createSafeActionClient } from 'next-safe-action';

import { defaultServerError, ServerActionError } from './errors';

export const action = createSafeActionClient({
    handleReturnedServerError(error: Error | ServerActionError) {
        return error.message ?? defaultServerError.message;
    },
    handleServerErrorLog(error: Error | ServerActionError) {
        console.error('Server action error', {
            serverError: error.message ?? defaultServerError.message,
            type: (error as ServerActionError).type ?? defaultServerError.type,
            error
        });
    }
});
