import { createContext, useContext } from 'react';

export interface TabsContextType {
  activeTab: string;
  setActiveTab: (value: string) => void;
  registerTab: (value: string, element: HTMLButtonElement | null) => void;
  tabElements: Map<string, HTMLButtonElement>;
}

export const TabsContext = createContext<TabsContextType | null>(null);

export const useTabsContext = () => {
  const context = useContext(TabsContext);
  if (!context) {
    throw new Error('Tabs components must be used within a Tabs provider');
  }
  return context;
};
