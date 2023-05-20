import { getNetwork } from '@/lib/network/get';

import { ConnectionList } from './components/connections-list';

export default async function Network() {
    const connections = await getNetwork();

    return <ConnectionList connections={connections}></ConnectionList>;
}
