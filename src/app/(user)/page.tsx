import Link from 'next/link';

import { getServerSession } from '@/lib/auth/session';
import { getFirstName } from '@/lib/reports/name';

import Button from '../components/button';
import PageTitle from '../components/page-title';

export default async function Home() {
    const session = await getServerSession();
    const firstName = getFirstName(session.user.name ?? '');

    return (
        <main>
            <PageTitle text={`👋 Hey, ${firstName}`} />
            <div>
                <Link href="/reports">
                    <Button>Check on your reports</Button>
                </Link>
            </div>
        </main>
    );
}
