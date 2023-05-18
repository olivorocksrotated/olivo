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
        <div className="max-w-fit rounded-lg bg-indigo-900 p-4">
            <div className="divide-y divide-indigo-700">
                {connections.map((connection) => (
                    <div key={connection.id}>
                        <Connection connection={connection} />
                    </div>
                ))}
            </div>
        </div>
    );

    const emptyNetworkMessage = (
        <div>The network is empty for now, start connecting to people!</div>
    );

    return (
        <main>
            <PageTitle text="Network" />
            <div className="py-10">
                <ConnectButton></ConnectButton>
            </div>
            {hasNetwork ? network : emptyNetworkMessage}
        </main>
    );
}
