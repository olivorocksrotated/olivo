'use client';

import { useOptimistic } from 'react';
import { useZact } from 'zact/client';

import Button from '@/app/components/ui/button/button';
import { updateConnectionStateAction } from '@/lib/network/connection/update';

export default function ToggleStateButton({ id, isConnected }: { id: string; isConnected: boolean }) {
    const { mutate: changeConnectionState } = useZact(updateConnectionStateAction);
    const [optimisticIsConnected, changeIsConnectedOptimistically] = useOptimistic<boolean, boolean>(
        isConnected,
        (state, newState) => newState
    );

    async function toggleState() {
        const newActiveState = !isConnected;
        changeIsConnectedOptimistically(newActiveState);
        await changeConnectionState({ id, newActiveState });
    }

    return <Button label={optimisticIsConnected ? 'Disconnect' : 'Connect'} onClick={toggleState} />;
}
