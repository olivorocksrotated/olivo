import { notFound } from 'next/navigation';

import { getConnection } from '@/lib/network/connection/get';

import Avatar from '../components/avatar/avatar';
import { AvatarSize } from '../components/avatar/types';
import ToggleStateButton from './components/toggle-state-button';

export default async function ConnectionPage({ params }: { params: { id: string } }) {
    const connection = await getConnection(params.id);

    if (!connection) {
        return notFound();
    }

    return (
        <div className="flex h-full justify-between">
            <div className="flex gap-4">
                <div>
                    <Avatar size={AvatarSize.Big} user={connection.user} />
                </div>
                <div>
                    <div className="text-2xl font-extralight text-neutral-100">
                        {connection.user.name || 'No name'}
                    </div>
                </div>
            </div>
            <div>
                <ToggleStateButton id={params.id} isConnected={connection.active}></ToggleStateButton>
            </div>
        </div>
    );
}
