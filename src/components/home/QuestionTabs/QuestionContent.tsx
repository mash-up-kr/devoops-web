'use client';

import React from 'react';

import QuestionItem from '@/components/home/QuestionTabs/QuestionItem';
import { useQuestionTabs } from '@/providers/QuestionTabsContext';
import { Question } from '@/types/questionTabs';

export default function QuestionContent() {
  const { categories, activeCategory } = useQuestionTabs();

  const currentCategory = categories.find((cat) => cat.id === activeCategory);

  if (!currentCategory) {
    return <div className={'text-center text-gray-500'}>{'카테고리를 찾을 수 없습니다.'}</div>;
  }

  return (
    <div className={'space-y-3'}>
      {currentCategory.questions.map(({ id, title, description }: Question) => (
        <QuestionItem key={id} id={id} title={title} description={description} />
      ))}

      {currentCategory.questions.length === 0 && (
        <div className={'py-8 text-center text-gray-500'}>{'이 카테고리에는 아직 질문이 없습니다.'}</div>
      )}
    </div>
  );
}
