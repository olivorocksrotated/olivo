import { createSafeActionClient } from 'next-safe-action';

import { defaultServerErrorMessage } from './errors';

export const action = createSafeActionClient({
    handleReturnedServerError(error) {
        return {
            serverError: defaultServerErrorMessage,
            error
        };
    }
});
