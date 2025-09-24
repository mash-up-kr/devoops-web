'use client';

import { Suspense, useState } from 'react';

import { RepositoryPullRequestResponseType, RepositorySummaryType } from '@/__generated__/@types';
import Preview from '@/components/home/Preview';
import { EachPRFetcher } from '@/components/home/PRFetcher/EachPRFetcher';
import { EntirePRFetcher } from '@/components/home/PRFetcher/EntirePRFetcher';
import { PRList } from '@/components/home/PRList';
import PreviewSkeleton from '@/components/home/Skeleton/PreviewSkeleton';
import PRListSkeleton from '@/components/home/Skeleton/PRListSkeleton';
import { ITEMS_PER_PAGE } from '@/constants/domain';

export type ActiveCategoryIndexesType = { [key: number]: number };

interface OverviewProps {
  repository: RepositorySummaryType;
}

export default function Overview({ repository }: OverviewProps) {
  const [pullRequestId, setPullRequestId] = useState<number | undefined>(0);
  const [currentPage, setCurrentPage] = useState<number>(0);
  const [activeCategoryIndexes, setActiveCategoryIndexes] = useState<ActiveCategoryIndexesType>({});

  const PRFetcher = repository.id ? EachPRFetcher : EntirePRFetcher;
  const totalPage = Math.ceil((repository.pullRequestCount || 0) / ITEMS_PER_PAGE);

  return (
    <div className={'flex'}>
      <Suspense fallback={<PRListSkeleton />}>
        <PRFetcher
          repository={repository}
          currentPage={currentPage}
          renderAction={(prListData: RepositoryPullRequestResponseType[]) => (
            <PRList
              prListData={prListData}
              totalPage={totalPage}
              pullRequestIdAction={setPullRequestId}
              currentPage={currentPage}
              currentPageAction={setCurrentPage}
              activeCategoryIndexesAction={setActiveCategoryIndexes}
            />
          )}
        />
      </Suspense>
      <Suspense fallback={<PreviewSkeleton />}>
        {pullRequestId && (
          <Preview
            pullRequestId={pullRequestId}
            activeCategoryIndex={activeCategoryIndexes[pullRequestId]}
            setActiveCategoryIndex={(index) =>
              setActiveCategoryIndexes((prev) => ({ ...prev, [pullRequestId]: index }))
            }
          />
        )}
      </Suspense>
    </div>
  );
}
