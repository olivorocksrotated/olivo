'use client';

import { useRouter } from 'next/navigation';
import { useZact } from 'zact/client';

import Button from '@/app/components/button';
import { deleteConnectionAction } from '@/lib/network/connection/delete';

export function DisconnectButton({ id }: { id: string }) {
    const { mutate: deleteConnection } = useZact(deleteConnectionAction);
    const router = useRouter();

    async function disconnect() {
        await deleteConnection(id);
        router.push('/network');
    }

    return <Button onClick={disconnect}>Disconnect</Button>;
}
