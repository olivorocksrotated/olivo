import Link from 'next/link';

import { getServerSession } from '@/lib/auth/session';

import Button from '../components/button';
import PageTitle from '../components/page-title';

export default async function Home() {
    const session = await getServerSession();

    return (
        <main>
            <PageTitle text={`👋 Hey, ${session.user.name}`} />
            <div>
                <Link href="/reports">
                    <Button>Check on your reports</Button>
                </Link>
            </div>
        </main>
    );
}
