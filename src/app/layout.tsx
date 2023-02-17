import './globals.css';
import { AnalyticsWrapper } from './components/analytics';

export default async function RootLayout({ children }: { children: React.ReactNode; }) {
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
