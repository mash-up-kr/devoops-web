'use client';

import { createContext, useContext } from 'react';

import { type Category } from '@/types/questionTabs';

interface QuestionTabsContextType {
  categories: Category[];
  activeCategory: number;
  setActiveCategory: (categoryId: number) => void;
  currentIndex: number;
  canGoPrev: boolean;
  canGoNext: boolean;
  goToPrev: () => void;
  goToNext: () => void;
}

export const QuestionTabsContext = createContext<QuestionTabsContextType | null>(null);

export const useQuestionTabs = () => {
  const context = useContext(QuestionTabsContext);
  if (!context) {
    throw new Error('useQuestionTabs must be used within a QuestionTabsProvider');
  }
  return context;
};
