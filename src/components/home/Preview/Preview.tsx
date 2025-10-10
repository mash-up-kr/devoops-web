'use client';

import { Dispatch, SetStateAction } from 'react';

import { useGetPullRequestQuery } from '@/apis/repositories/repositories.query';
import AISummary from '@/components/home/AISummary';
import { ActiveCategoryIndexesType } from '@/components/home/Overview';
import { EmptyPreview } from '@/components/home/Preview/EmptyPreview';
import QuestionPreview from '@/components/home/QuestionPreview';
import PreviewSkeleton from '@/components/home/Skeleton/PreviewSkeleton';

interface PreviewProps {
  prCount: number;
  pullRequestId: number | undefined;
  activeCategoryIndexes: ActiveCategoryIndexesType;
  activeCategoryIndexesAction: Dispatch<SetStateAction<ActiveCategoryIndexesType>>;
}

export function Preview({ prCount, pullRequestId, activeCategoryIndexes, activeCategoryIndexesAction }: PreviewProps) {
  const { data: PRDetailData, isLoading } = useGetPullRequestQuery({
    variables: {
      pullRequestId: pullRequestId ?? 0,
    },
    options: { enabled: pullRequestId !== undefined },
  });

  if (isLoading) {
    return <PreviewSkeleton />;
  }

  if (prCount === 0) {
    return null;
  }

  if (!pullRequestId || !PRDetailData) {
    return <EmptyPreview />;
  }

  const activeCategoryIndex = activeCategoryIndexes[pullRequestId];

  const handleActiveCategoryIndexes = (index: number) => {
    activeCategoryIndexesAction((prev) => ({ ...prev, [pullRequestId]: index }));
  };

  return (
    <div className={'min-h-preview mx-8 my-5 flex max-w-[438px] flex-col pt-5 max-lg:w-[338px]'}>
      <h5 className={'text-h5 mb-[23px] font-medium'}>{'미리보기'}</h5>
      <div className={'border-dark-grey-100 border-b pb-7'}>
        <AISummary contents={PRDetailData.data.summary} />
      </div>
      <div className={'pt-7'}>
        <QuestionPreview
          key={PRDetailData.data.id}
          contents={PRDetailData.data}
          activeCategoryIndex={activeCategoryIndex}
          activeCategoryIndexesAction={handleActiveCategoryIndexes}
        />
      </div>
    </div>
  );
}
