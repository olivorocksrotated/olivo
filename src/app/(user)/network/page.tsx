import PageTitle from '@/app/components/page-title';
import { getServerSession } from '@/lib/auth/session';
import { getReportsByManager } from '@/lib/reports/get';

import ConnectButton from './components/connect-button';
import Connection from './components/connection';

export default async function Network() {
    const { user } = await getServerSession();
    const connections = await getReportsByManager(user.id);

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
        <div>The network is empty for now, start connecting to people!</div>
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
