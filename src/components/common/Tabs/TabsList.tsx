import { ReactNode } from 'react';

interface TabsListProps {
  children: ReactNode;
  className?: string;
}

export function TabsList({ children, className = '' }: TabsListProps) {
  return (
    <div
      role={'tablist'}
      className={`
        inset-shadow-tabs-list
        ${className}
      `}
    >
      <div className={'flex'}>{children}</div>
    </div>
  );
}
