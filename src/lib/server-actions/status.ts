import { HookActionStatus } from 'next-safe-action/hook';

export function isLoading(status: HookActionStatus) {
    return status === 'executing';
}
