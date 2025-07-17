'use client';

import { useGetPullRequestQuery } from '@/apis/repositories/repositories.query';
import AISummary from '@/components/home/AISummary';
import QuestionPreview from '@/components/home/QuestionPreview';
import PreviewSkeleton from '@/components/home/Skeleton/PreviewSkeleton';

interface PreviewProps {
  pullRequestId?: number;
}

export default function Preview({ pullRequestId }: PreviewProps) {
  const { data: PRDetailData, isLoading } = useGetPullRequestQuery({
    variables: {
      pullRequestId: pullRequestId ?? 0,
    },
    options: {
      enabled: pullRequestId !== undefined,
    },
  });

  return (
    <div>
      {isLoading || !PRDetailData ? (
        <PreviewSkeleton />
      ) : (
        <div className={'mx-8 my-5 flex flex-col pt-5 md:w-[300px] xl:w-[438px]'}>
          <h5 className={'text-h5 mb-[23px] font-medium'}>{'미리보기'}</h5>
          <div className={'border-dark-grey-100 border-b pb-7'}>
            <AISummary contents={PRDetailData.data.summary} />
          </div>
          <div className={'pt-7'}>
            <QuestionPreview contents={PRDetailData.data} />
          </div>
        </div>
      )}
    </div>
  );
}
