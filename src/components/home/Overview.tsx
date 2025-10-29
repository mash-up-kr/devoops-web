'use client';

import { Dispatch, SetStateAction, Suspense, useState } from 'react';

import { RepositoryPullRequestResponseType, RepositorySummaryType } from '@/__generated__/@types';
import { Preview } from '@/components/home/Preview';
import { EachPRFetcher } from '@/components/home/PRFetcher/EachPRFetcher';
import { EntirePRFetcher } from '@/components/home/PRFetcher/EntirePRFetcher';
import { PRList } from '@/components/home/PRList';
import PRListSkeleton from '@/components/home/Skeleton/PRListSkeleton';
import { ITEMS_PER_PAGE, TOTAL_TABS } from '@/constants/domain';

export type ActiveCategoryIndexesType = { [key: number]: number };

interface OverviewProps {
  repository: RepositorySummaryType;
  currentPage: number;
  currentPageAction: Dispatch<SetStateAction<number>>;
}

export function Overview({ repository, currentPage, currentPageAction }: OverviewProps) {
  const [pullRequestId, setPullRequestId] = useState<number | undefined>(undefined);
  const [activeCategoryIndexes, setActiveCategoryIndexes] = useState<ActiveCategoryIndexesType>({});

  const PRFetcher = repository.id === TOTAL_TABS.ID ? EntirePRFetcher : EachPRFetcher;
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
              currentPageAction={currentPageAction}
              activeCategoryIndexesAction={setActiveCategoryIndexes}
            />
          )}
        />
      </Suspense>
      <Preview
        prCount={repository.pullRequestCount ?? 0}
        pullRequestId={pullRequestId}
        activeCategoryIndexes={activeCategoryIndexes}
        activeCategoryIndexesAction={setActiveCategoryIndexes}
      />
    </div>
  );
}
