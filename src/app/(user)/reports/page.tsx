import { getServerSession } from '@/lib/auth/session';
import { getReportsByManager } from '@/lib/reports/get';

export default async function Reports() {
    const { user } = await getServerSession();
    const reports = await getReportsByManager(user.id);

    return (
        <div>
            {reports.map((report) => <div key={report.id}>{report.name}</div>)}
        </div>
    );
}
