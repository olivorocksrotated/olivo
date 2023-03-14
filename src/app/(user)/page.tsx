import Link from 'next/link';

import { getServerSession } from '@/lib/auth/session';

import Button from '../components/button';

export default async function Home() {
    const session = await getServerSession();

    return (
        <main className="flex flex-col gap-4 justify-center mt-6 items-center">
            <div className="text-zinc-500 text-2xl font-bold"> 👋 Hey, <span className="p-2">{session.user.name}</span></div>
            <div>
                <Link href="/reports">
                    <Button>Check on your reports</Button>
                </Link>
            </div>
        </main>
    );
}
