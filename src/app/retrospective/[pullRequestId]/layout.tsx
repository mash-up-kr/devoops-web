import { ReactNode } from 'react';

interface RetrospectiveLayoutProps {
  children: ReactNode;
}

export default function RetrospectiveLayout({ children }: RetrospectiveLayoutProps) {
  return <div className={'mx-auto max-w-[840px] min-w-[640px] px-[40px] pt-[68px] pb-[132px]'}>{children}</div>;
}
