import type { Metadata } from 'next';
import { Session } from 'next-auth';
import { ReactNode } from 'react';

import NextAuthSessionProvider from './providers/NextAuthSessionProvider';

import QueryProvider from '@/providers/QueryProvider';
import './globals.css';

export const metadata: Metadata = {
  title: 'DevOops',
  description: 'GitHub PR 요약과 회고 질문을 통해 개발자의 작업 맥락과 고민을 자연스럽게 기록하도록 돕는 서비스',
};

interface RootLayoutProps {
  session: Session;
  children: ReactNode;
}

export default function RootLayout({ session, children }: Readonly<RootLayoutProps>) {
  return (
    <html lang={'ko-KR'}>
      <head>
        <link rel={'preconnect'} href={'https://cdn.jsdelivr.net'} crossOrigin={'anonymous'} />
        <link
          rel={'preload'}
          as={'font'}
          type={'font/woff2'}
          crossOrigin={'anonymous'}
          href={'http://static.dev-oops.kr/fonts/PretendardVariable.woff2'}
        />
        <link rel={'stylesheet'} href={'https://static.dev-oops.kr/fonts/pretendardvariable.css'} />
      </head>
      <NextAuthSessionProvider session={session}>
        <QueryProvider>
          <body>{children}</body>
        </QueryProvider>
      </NextAuthSessionProvider>
    </html>
  );
}
