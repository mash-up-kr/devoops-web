'use client';

import { useRouter } from 'next/navigation';
import React from 'react';

import { QuestionBriefResponseType } from '@/__generated__/@types';
import Button from '@/components/common/Button';
import QuestionItem from '@/components/home/QuestionTabs/QuestionItem';
import { ROUTES } from '@/constants/routes';
import { filterBy } from '@/utils/filter';

interface QuestionContentProps {
  pullRequestId: number | undefined;
  questions: QuestionBriefResponseType[];
  activeCategory: string;
}

export default function QuestionContent({ pullRequestId, questions, activeCategory }: QuestionContentProps) {
  const router = useRouter();

  const navigateToRetrospective = (prId: number | undefined) => {
    if (prId) {
      router.push(ROUTES.PAGE.RETROSPECTIVE(prId));
    }
  };

  const matchedQuestionByCategory = filterBy(questions, 'category', activeCategory);

  return (
    <div className={'space-y-3'}>
      {matchedQuestionByCategory.map(({ id, category, content }) => (
        <QuestionItem key={id} id={id} category={category} content={content} />
      ))}

      {matchedQuestionByCategory.length === 0 && (
        <div className={'text-dark-grey-500 py-8 text-center'}>{'카테고리를 선택해주세요.'}</div>
      )}

      <div className={'mt-7 flex justify-end'}>
        <Button
          className={'text-body-large cursor-pointer font-semibold'}
          disabled={!pullRequestId}
          onClick={() => navigateToRetrospective(pullRequestId)}
        >
          {'자세히보기'}
        </Button>
      </div>
    </div>
  );
}
