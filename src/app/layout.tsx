import './globals.css';
import 'react-toastify/dist/ReactToastify.min.css';

import Script from 'next/script';

import { AnalyticsWrapper } from './components/analytics';
import ToastContainer from './components/toast-container';
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
            <body>
                {children}
                <ToastContainer />
                <AnalyticsWrapper />
            </body>
            <Script src="https://sak.userreport.com/olivorocks/launcher.js" defer id="userreport-launcher-script" />
        </html>
    );
}
