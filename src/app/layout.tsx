import './globals.css'
import { AnalyticsWrapper } from './components/analytics';

import { getServerSession } from "next-auth/next";
import { authOptions } from "../pages/api/auth/[...nextauth]";
import LoginButton from './components/login-btn';

export default async function RootLayout({ children }: { children: React.ReactNode; }) {
  const session = await getServerSession(authOptions);

  if (!session?.user) {
    return (
      <html lang="en">
        <head></head>
        <body className='h-screen w-screen flex justify-center items-center'>
          <LoginButton></LoginButton>
        </body>
      </html>
    );
  }

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
