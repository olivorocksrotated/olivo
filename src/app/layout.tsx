import './globals.css';

import { Inter } from 'next/font/google';

import { AnalyticsWrapper } from './components/analytics';

export const metadata = {
    title: 'Olivo',
    description: 'Olivo app',
    icons: {
        icon: '/favicon.ico'
    }
};

const inter = Inter({ subsets: ['latin'] });

export default function RootLayout({ children }: { children: React.ReactNode; }) {
    return (
        <html lang="en">
            <head></head>
            <body className={inter.className}>
                {children}
                <AnalyticsWrapper />
            </body>
        </html>
    );
}
