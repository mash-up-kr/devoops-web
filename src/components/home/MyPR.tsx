'use client';

import { Suspense, useEffect, useMemo, useState } from 'react';

import { RepositoryPullRequestResponseType, RepositorySummaryType } from '@/__generated__/@types';
import {
  useGetEntirePullRequestsQuery,
  useRepositoriesMeQuery,
  useGetPullRequestsQuery,
} from '@/apis/repositories/repositories.query';
import AddIcon from '@/assets/svg/add.svg';
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationPrevious,
  PaginationNext,
  PaginationEllipsis,
} from '@/components/common/Pagination';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/common/Tabs';
import Preview from '@/components/home/Preview';
import { PRItem, PRStatus, PRContent } from '@/components/home/PRItem';
import PRPreview from '@/components/home/PRPreview';
import PreviewSkeleton from '@/components/home/Skeleton/PreviewSkeleton';
import { usePagination } from '@/hooks/usePagination';

export default function MyPR() {
  const [repositoryId, setRepositoryId] = useState<number>(0);
  const [pullRequestId, setPullRequestId] = useState<number | undefined>(undefined);
  const [page, setPage] = useState(1);
  const pageSize = 5;

  const { data: myRepositoriesData } = useRepositoriesMeQuery({ variables: { data: { url: '' } }, options: {} });

  const { data: PRData } = useGetPullRequestsQuery({
    variables: {
      repositoryId,
      query: {
        size: pageSize,
        page,
      },
    },
    options: {
      enabled: repositoryId !== 0,
    },
  });

  const { data: entirePRData } = useGetEntirePullRequestsQuery({
    variables: {
      query: {
        size: pageSize,
        page,
      },
    },
    options: {
      enabled: repositoryId === 0,
    },
  });

  const entireRepositoryData = {
    id: 0,
    name: '전체',
    pullRequestCount: myRepositoriesData?.data.repositories?.reduce((acc, repository) => {
      return acc + (repository.pullRequestCount || 0);
    }, 0),
  };

  const repositoryList = [entireRepositoryData, ...(myRepositoriesData?.data.repositories || [])];
  const PRList = useMemo(
    () => (repositoryId === 0 ? entirePRData?.data.pullRequests : PRData?.data.pullRequests) || [],
    [repositoryId, entirePRData, PRData],
  );

  useEffect(() => {
    setPullRequestId(PRList[0]?.id);
  }, [PRList]);

  const handleTabChange = (repository: RepositorySummaryType) => {
    if (repository.id !== undefined) {
      setRepositoryId(repository.id);
      setPage(1);
    }
  };

  const handlePRItemOver = (pr: RepositoryPullRequestResponseType) => {
    if (pr.id) {
      setPullRequestId(pr.id);
    }
  };

  const totalPullRequestCount =
    repositoryId === 0
      ? entireRepositoryData.pullRequestCount
      : repositoryList.find((repo) => repo.id === repositoryId)?.pullRequestCount;

  const totalPage = Math.ceil((totalPullRequestCount || 0) / pageSize);
  const { pagesToShow } = usePagination({ totalPage, currentPage: page });

  return (
    <div>
      <h1 className={`text-h1 blue-tiny-left inline-block pt-2.5 pb-6 font-semibold`}>{'내 PR'}</h1>
      <Tabs defaultValue={repositoryList[0]?.name || '전체'} className={'w-full'}>
        <TabsList>
          {repositoryList.map((repository) => (
            <TabsTrigger key={repository.id} value={repository.name || ''} onClick={() => handleTabChange(repository)}>
              {repository.name}
            </TabsTrigger>
          ))}
          <AddIcon />
        </TabsList>

        {repositoryList.map((repository) => (
          <TabsContent key={repository.id} value={repository.name || ''} className={'flex'}>
            <div className={`border-dark-grey-100 flex flex-1 flex-col gap-5 border-e-1 py-4 pe-8`}>
              {PRList.map((pr) => (
                <PRItem key={pr.id} onMouseOver={() => handlePRItemOver(pr)}>
                  <PRStatus status={pr.recordStatus} />
                  <PRContent content={pr.title} label={pr.tag || ''} />
                </PRItem>
              ))}

              <Pagination>
                <PaginationContent>
                  <PaginationItem>
                    <PaginationPrevious
                      className={'flex size-10 items-center justify-center rounded-full'}
                      onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
                    />
                  </PaginationItem>

                  {pagesToShow.map((p, idx) => {
                    if (p === 'ellipsis') {
                      const key = idx === 0 ? 'ellipsis-left' : 'ellipsis-right';
                      return (
                        <PaginationItem key={key}>
                          <PaginationEllipsis />
                        </PaginationItem>
                      );
                    }

                    return (
                      <PaginationItem key={`page-${p}`}>
                        <PaginationLink
                          isActive={page === p}
                          onClick={() => setPage(p)}
                          className={`text-body-medium flex size-10 items-center justify-center rounded-full transition-colors duration-100 ease-out ${page === p ? 'bg-dark-grey-50 font-medium' : 'font-regular'}`}
                        >
                          {p}
                        </PaginationLink>
                      </PaginationItem>
                    );
                  })}

                  <PaginationItem>
                    <PaginationNext
                      className={'flex size-10 items-center justify-center rounded-full'}
                      onClick={() => setPage((prev) => Math.min(prev + 1, totalPage))}
                    />
                  </PaginationItem>
                </PaginationContent>
              </Pagination>
            </div>
            <Suspense fallback={<PreviewSkeleton />}>
              {pullRequestId ? <PRPreview pullRequestId={pullRequestId} /> : <Preview />}
            </Suspense>
          </TabsContent>
        ))}
      </Tabs>
    </div>
  );
}
