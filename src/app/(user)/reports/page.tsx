import { getServerSession } from '@/lib/auth/session';
import { getReportsByManager } from '@/lib/reports/get';

import Report from './components/report';

export default async function Reports() {
    const { user } = await getServerSession();
    const reports = await getReportsByManager(user.id);

    return (
        <div>
            {reports.map((report) => <Report key={report.id} report={report}/>)}
        </div>
    );
}
