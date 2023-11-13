'use client';

import { useAction } from 'next-safe-action/hook';
import { useOptimistic } from 'react';

import Button from '@/app/components/ui/button/button';
import type { updateConnectionStateAction } from '@/lib/network/connection/update';

interface Props {
    id: string;
    isConnected: boolean;
    updateConnectionStateAction: typeof updateConnectionStateAction;
}

export default function ToggleStateButton({ id, isConnected, updateConnectionStateAction }: Props) {
    const { execute: changeConnectionState } = useAction(updateConnectionStateAction);
    const [optimisticIsConnected, changeIsConnectedOptimistically] = useOptimistic<boolean, boolean>(
        isConnected,
        (_, newState) => newState
    );

    async function toggleState() {
        const newActiveState = !isConnected;
        changeIsConnectedOptimistically(newActiveState);
        await changeConnectionState({ id, newActiveState });
    }

    return <Button label={optimisticIsConnected ? 'Disconnect' : 'Connect'} onClick={toggleState} />;
}
