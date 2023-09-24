import { getNetwork } from '@/lib/network/get';

import { ConnectionList } from './components/connections-list';

export default async function Connect() {
    const connections = await getNetwork();

    return <ConnectionList connections={connections}></ConnectionList>;
}
