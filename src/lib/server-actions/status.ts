import { HookActionStatus } from 'next-safe-action/hook';

export function isLoading(status: HookActionStatus) {
    return status === 'executing';
}

export function isError(status: HookActionStatus) {
    return status === 'hasErrored';
}
