import PageTitle from '@/app/components/page-title';
import { getServerSession } from '@/lib/auth/session';
import { getReportsByManager } from '@/lib/reports/get';

import AddReportButton from './components/add-report-button';
import Report from './components/report';

export default async function Reports() {
    const { user } = await getServerSession();
    const reports = await getReportsByManager(user.id);

    const hasReports = reports.length !== 0;
    const reportsList = (
        <div className="max-w-fit rounded-lg bg-indigo-900 p-4">
            <div className="mb-4 p-3 text-lg font-normal">Upcoming 1:1s</div>
            <div className="divide-y divide-indigo-700">
                {reports.map((report) => (
                    <div key={report.id}>
                        <Report report={report} />
                    </div>
                ))}
            </div>
        </div>
    );
    const noReports = (
        <div>The network is empty for now, start connecting to people!</div>
    );

    return (
        <main>
            <PageTitle text="Network" />
            <div className="py-10">
                <AddReportButton></AddReportButton>
            </div>
            {hasReports ? reportsList : noReports}
        </main>
    );
}
