import PageTitle from '@/app/components/page-title';
import { getServerSession } from '@/lib/auth/session';
import { getReportsByManager } from '@/lib/reports/get';

import Report from './components/report';

export default async function Reports() {
    const { user } = await getServerSession();
    const reports = await getReportsByManager(user.id);

    return (
        <main>
            <PageTitle text="Reports" />
            <div className="bg-indigo-900 max-w-fit rounded-lg p-4">
                <div className="text-lg mb-4 p-3 font-normal">Upcoming 1:1s</div>
                <div className="divide-y divide-indigo-700">
                    {reports.map((report) => (
                        <div key={report.id}>
                            <Report report={report} />
                        </div>
                    ))}
                </div>
            </div>
        </main>
    );
}
