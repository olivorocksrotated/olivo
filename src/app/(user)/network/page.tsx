
import PageTitle from '@/app/components/page-title';
import { getNetwork } from '@/lib/network/get';

import { ConnectionList } from './components/connections-list';

export default async function Network() {
    const connections = await getNetwork();

    return (
        <main>
            <PageTitle text="Network" />
            <ConnectionList connections={connections}></ConnectionList>
        </main>
    );
}
