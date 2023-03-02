import { Inter } from '@next/font/google';
import { getServerSession } from 'next-auth';

import { authOptions } from '@/pages/api/auth/[...nextauth]';

import LogoutButton from './logout-btn';

const inter = Inter({ subsets: ['latin'] });

export default async function Home() {
    const session = await getServerSession(authOptions);

    return (
        <main className={`flex gap-4 justify-center mt-6 items-center ${ inter.className }`}>
            <div className="text-zinc-500 font-bold">Welcome 👋 <span className="p-2">{ session?.user?.name }</span></div>
            <LogoutButton></LogoutButton>
        </main>
    );
}
