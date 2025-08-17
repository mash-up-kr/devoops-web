import type { Metadata } from 'next';
import { ReactNode } from 'react';

import GASuspense from '@/components/common/GA/GASuspense';
import { initMSW } from '@/mocks';
import ModalProvider from '@/providers/ModalContext';
import MSWClientProvider from '@/providers/MSWClientProvider';
import QueryProvider from '@/providers/QueryProvider';

import './globals.css';

export const metadata: Metadata = {
  title: 'Devoops',
  description: '개발 중 망각되는 고민들을 자동 수집해 회고를 돕는 AI 회고 서비스',
  openGraph: {
    title: 'Devoops',
    description: '개발 중 망각되는 고민들을 자동 수집해 회고를 돕는 AI 회고 서비스',
    url: 'https://dev-oops.kr',
    siteName: 'Devoops',
    images: [{ url: '/assets/images/opengraph-image.webp' }],
    locale: 'ko_KR',
    type: 'website',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  if (process.env.NEXT_PUBLIC_MOCK_API === 'enabled') {
    initMSW();
  }

  return (
    <html lang={'ko-KR'}>
      <QueryProvider>
        <body>
          <MSWClientProvider />
          <ModalProvider>{children}</ModalProvider>
          <div id={'portal'} />
          <GASuspense />
        </body>
      </QueryProvider>
    </html>
  );
}
