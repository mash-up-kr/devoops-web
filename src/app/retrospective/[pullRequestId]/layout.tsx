import { ReactNode } from 'react';

interface RetrospectiveLayoutProps {
  children: ReactNode;
}

export default function RetrospectiveLayout({ children }: RetrospectiveLayoutProps) {
  return <div className={'px-[40px] pt-[68px] pb-[132px]'}>{children}</div>;
}
