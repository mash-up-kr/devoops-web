'use client';

import { Session } from 'next-auth';
import { SessionProvider } from 'next-auth/react';
import { ReactNode } from 'react';

interface NextAuthSessionProviderProps {
  session: Session;
  children: ReactNode;
}

export default function NextAuthSessionProvider({ children, session }: NextAuthSessionProviderProps) {
  return <SessionProvider session={session}>{children}</SessionProvider>;
}
