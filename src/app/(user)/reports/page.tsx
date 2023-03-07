import { getServerSession } from 'next-auth';

import { getReportsByManager } from '@/lib/reports/get';
import { authOptions } from '@/pages/api/auth/[...nextauth]';

export default async function Reports() {
    const session = await getServerSession(authOptions);
    const reports = await getReportsByManager(session?.user?.id);

    return (
        <div>
            {reports.map((report) => <div key={report.id}>{report.name}</div>)}
        </div>
    );
}
