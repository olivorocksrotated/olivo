'use client';

import { Session } from 'next-auth';
import { SessionProvider } from 'next-auth/react';

interface Props {
  children: React.ReactNode;
  session: Session;
}

export default function AuthContext({ children, session }: Props) {
    return <SessionProvider session={session} refetchInterval={5 * 60}>{children}</SessionProvider>;
}
