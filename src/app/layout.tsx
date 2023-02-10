import './globals.css'
import { AnalyticsWrapper } from './components/analytics';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        {/*
          <head /> will contain the components returned by the nearest parent
          head.tsx. Find out more at https://beta.nextjs.org/docs/api-reference/file-conventions/head
        */}
        <title>Next.js</title>
      </head>
      <body>
        {children}
        <AnalyticsWrapper />
      </body>
    </html>
  );
}
