import './globals.css';

import { AnalyticsWrapper } from './components/analytics';
import Fonts from './fonts';

export const metadata = {
    title: 'Olivo',
    description: 'Olivo app',
    icons: {
        icon: '/favicon.ico'
    }
};

export default function RootLayout({ children }: { children: React.ReactNode; }) {
    return (
        <html lang="en">
            <Fonts />
            <body style={{ background: '#17191a' }}>
                {children}
                <AnalyticsWrapper />
            </body>
        </html>
    );
}
