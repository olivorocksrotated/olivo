import PageTitle from '@/app/components/page-title';
import { getNetwork } from '@/lib/network/get';

import ConnectButton from './components/connect-button';
import Connection from './components/connection';

export default async function Network() {
    const connections = await getNetwork();

    const hasNetwork = connections.length !== 0;
    const network = (
        <div className="grid grid-cols-1 gap-4 py-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {connections.map((connection) => (
                <div key={connection.id}>
                    <Connection connection={connection} />
                </div>
            ))}
        </div>
    );

    const emptyNetworkMessage = (
        <div className="py-10 text-xl">Your network is empty for now, start growing it by connecting with people.</div>
    );

    return (
        <main>
            <PageTitle text="Network" />
            <div>
                <ConnectButton></ConnectButton>
            </div>
            {hasNetwork ? network : emptyNetworkMessage}
        </main>
    );
}
