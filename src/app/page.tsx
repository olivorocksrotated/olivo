import { Inter } from '@next/font/google';
import { getServerSession } from 'next-auth';

import { authOptions } from '@/pages/api/auth/[...nextauth]';

import LogoutButton from './components/logout-btn';
import styles from './page.module.css';

const inter = Inter({ subsets: ['latin'] });

export default async function Home() {
    const session = await getServerSession(authOptions);

    return (
        <main className={styles.main}>
            <div className={`flex flex-col gap-4 justify-center items-center ${ inter.className }`}>
                <div className={`${ styles.logo } bg-gradient-to-r from-transparent via-purple-400  to-transparent rounded-md font-bold text-5xl px-20 py-5`}>
          OLIVO
                </div>
                <div className="text-zinc-500 font-bold">Welcome 👋 <span className="p-2">{ session?.user?.name }</span></div>
                <LogoutButton></LogoutButton>
            </div>
        </main>
    );
}

