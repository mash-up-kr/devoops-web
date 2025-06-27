'use client';

import { ReactNode } from 'react';

import { useTabsContext } from '@/providers/TabsContext';

interface TabsContentProps {
  value: string;
  children: ReactNode;
  className?: string;
}

export default function TabsContent({ value, children, className = '' }: TabsContentProps) {
  const { activeTab } = useTabsContext();

  if (activeTab !== value) return null;

  return (
    <div role={'tabpanel'} className={className}>
      {children}
    </div>
  );
}
