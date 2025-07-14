import type { Metadata } from 'next';
import { ReactNode } from 'react';

import ModalProvider from '@/providers/ModalContext';
import QueryProvider from '@/providers/QueryProvider';
import './globals.css';

export const metadata: Metadata = {
  title: 'DevOops',
  description: 'GitHub PR 요약과 회고 질문을 통해 개발자의 작업 맥락과 고민을 자연스럽게 기록하도록 돕는 서비스',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <html lang={'ko-KR'}>
      <QueryProvider>
        <body>
          <ModalProvider>{children}</ModalProvider>
          <div id={'portal'} />
        </body>
      </QueryProvider>
    </html>
  );
}
