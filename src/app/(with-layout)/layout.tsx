import { ReactNode } from 'react';

import GlobalNavigation from '@/components/common/GlobalNavigation';

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
