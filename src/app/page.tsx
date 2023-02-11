import Image from 'next/image'
import { Inter } from '@next/font/google'

import styles from './page.module.css'

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  return (
    <main className={styles.main}>
      <div className={styles.center}>
        <div className={`${styles.logo} font-bold text-5xl p-10`}>
          Olivo
        </div>
      </div>
    </main>
  )
}
