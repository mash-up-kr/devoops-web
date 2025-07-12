import { ReactNode } from 'react';

interface TabsListProps {
  children: ReactNode;
  className?: string;
}

export default function TabsList({ children, className = '' }: TabsListProps) {
  return (
    <div
      role={'tablist'}
      className={`
        inset-shadow-tabs-list overflow-x-scroll
        ${className}
      `}
    >
      <div className={'flex'}>{children}</div>
    </div>
  );
}
