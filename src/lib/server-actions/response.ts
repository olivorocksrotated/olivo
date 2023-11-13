import { ServerActionSuccess } from './types';

export function createServerActionSuccessResponse(): ServerActionSuccess {
    return { status: 'success' };
}
