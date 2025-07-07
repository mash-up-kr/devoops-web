import type { Metadata } from 'next';
import { ReactNode } from 'react';

import GlobalNavigation from '@/components/common/GlobalNavigation';

export const metadata: Metadata = {
  title: 'DevOops',
  description: 'GitHub PR 요약과 회고 질문을 통해 개발자의 작업 맥락과 고민을 자연스럽게 기록하도록 돕는 서비스',
};

export default function WithGlobalNavigationLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <>
      <GlobalNavigation />
      {children}
    </>
  );
}
