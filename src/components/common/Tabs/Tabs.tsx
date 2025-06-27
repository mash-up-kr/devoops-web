'use client';

import { useState, useRef, ReactNode, useMemo } from 'react';

import { TabsContext } from '@/providers/TabsContext';

interface TabsProps {
  defaultValue: string;
  children: ReactNode;
  className?: string;
}

export function Tabs({ defaultValue, children, className = '' }: TabsProps) {
  const [activeTab, setActiveTab] = useState(defaultValue);
  const tabRefs = useRef(new Map<string, HTMLButtonElement>());

  const registerTab = (value: string, element: HTMLButtonElement | null) => {
    if (element) {
      tabRefs.current.set(value, element);
    } else {
      tabRefs.current.delete(value);
    }
  };

  const contextValue = useMemo(
    () => ({
      activeTab,
      setActiveTab,
      registerTab,
      tabElements: tabRefs.current,
    }),
    [activeTab],
  );

  return (
    <TabsContext.Provider value={contextValue}>
      <div
        className={`
          ${className}
        `}
      >
        {children}
      </div>
    </TabsContext.Provider>
  );
}
