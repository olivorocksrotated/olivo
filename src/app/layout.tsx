import './globals.css';

import { AnalyticsWrapper } from './components/analytics';

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
            <head></head>
            <body>
                { children }
                <AnalyticsWrapper />
            </body>
        </html>
    );
}
