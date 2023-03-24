import Link from 'next/link';

import { getServerSession } from '@/lib/auth/session';
import { getFirstName } from '@/lib/reports/name';

import Button from '../components/button';
import PageTitle from '../components/page-title';
import AddCommitmentButton from './(commitments)/components/add-commitment-btn';
import CommitmentsList from './(commitments)/components/commitments-list';

export default async function Home() {
    const session = await getServerSession();
    const firstName = getFirstName(session.user.name ?? '');

    return (
        <main>
            <PageTitle text={`👋 Hey, ${firstName}`} />
            <div className="mb-10">
                <Link href="/reports">
                    <Button>Check on your reports</Button>
                </Link>
            </div>
            <div>
                <div className="text-xl mb-4">Your commitments</div>
                <div><AddCommitmentButton /></div>
                <div className="max-w-3xl">{await CommitmentsList()}</div>
            </div>
        </main>
    );
}
