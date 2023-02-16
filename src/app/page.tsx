import Image from 'next/image'
import { Inter } from '@next/font/google';

import styles from './page.module.css';
import LogoutButton from './components/logout-btn';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/pages/api/auth/[...nextauth]';

const inter = Inter({ subsets: ['latin'] })

export default async function Home() {
  const session = await getServerSession(authOptions);
  return (
    <main className={styles.main}>
      <div className={`flex flex-col gap-4 justify-center items-center`}>
        <div className={`${styles.logo} font-bold text-5xl p-10`}>
          Olivo
        </div>
        <div className='text-zinc-500'>Welcome 👋 <span className='p-2'>{ session?.user?.name }</span></div>
        <LogoutButton></LogoutButton>
      </div>
    </main>
  )
}

