'use client';

import React from 'react';

import { QuestionBriefResponseType } from '@/__generated__/@types';
import QuestionItem from '@/components/home/QuestionTabs/QuestionItem';
import { filterBy } from '@/utils/filter';

interface QuestionContentProps {
  questions: QuestionBriefResponseType[];
  activeCategory: string;
}

export default function QuestionContent({ questions, activeCategory }: QuestionContentProps) {
  const matchedQuestionByCategory = filterBy(questions, 'category', activeCategory);

  return (
    <div className={'space-y-3'}>
      {matchedQuestionByCategory.map(({ id, category, content }) => (
        <QuestionItem key={id} id={id} category={category} content={content} />
      ))}

      {matchedQuestionByCategory.length === 0 && (
        <div className={'text-dark-grey-500 py-8 text-center'}>{'이 카테고리에는 아직 질문이 없습니다.'}</div>
      )}
    </div>
  );
}
