'use client';

import { useRouter } from 'next/navigation';
import React from 'react';

import { QuestionBriefResponseType } from '@/__generated__/@types';
import Button from '@/components/common/Button';
import QuestionItem from '@/components/home/QuestionTabs/QuestionItem';
import { filterBy } from '@/utils/filter';

interface QuestionContentProps {
  pullRequestId: number | undefined;
  questions: QuestionBriefResponseType[];
  activeCategory: string;
}

export default function QuestionContent({ pullRequestId, questions, activeCategory }: QuestionContentProps) {
  const router = useRouter();

  const handleClick = (prId: number | undefined) => {
    if (prId) {
      router.push(`/retrospective/${prId}`);
    }
  };

  const matchedQuestionByCategory = filterBy(questions, 'category', activeCategory);

  return (
    <div className={'space-y-3'}>
      {matchedQuestionByCategory.map(({ id, category, content }) => (
        <QuestionItem key={id} id={id} category={category} content={content} />
      ))}

      {matchedQuestionByCategory.length === 0 && (
        <div className={'text-dark-grey-500 py-8 text-center'}>{'이 카테고리에는 아직 질문이 없습니다.'}</div>
      )}

      <div className={'mt-7 flex justify-end'}>
        <Button
          className={'text-body-large cursor-pointer font-semibold'}
          disabled={!pullRequestId}
          onClick={() => handleClick(pullRequestId)}
        >
          {'자세히보기'}
        </Button>
      </div>
    </div>
  );
}
