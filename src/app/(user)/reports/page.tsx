import { getServerSession } from '@/lib/auth/session';
import { getReportsByManager } from '@/lib/reports/get';

import Report from './components/report';

export default async function Reports() {
    const { user } = await getServerSession();
    const reports = await getReportsByManager(user.id);

    return (
        <div>
            <h1 className="text-4xl mb-16">Team overview</h1>
            <div className="text-xl mb-4">Upcoming 1:1s</div>
            <div className="mb-8">
                {reports.map((report) => <Report key={report.id} report={report}/>)}
            </div>
        </div>
    );
}
