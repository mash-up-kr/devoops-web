'use client';

import { HTMLProps, ReactNode } from 'react';

import { useTabsContext } from '@/providers/TabsContext';

interface TabsContentProps extends HTMLProps<HTMLDivElement> {
  value: string;
  children: ReactNode;
}

export default function TabsContent({ value, children, className = '', ...props }: TabsContentProps) {
  const { activeTab } = useTabsContext();

  if (activeTab !== value) return null;

  return (
    <div role={'tabpanel'} className={className} {...props}>
      {children}
    </div>
  );
}
