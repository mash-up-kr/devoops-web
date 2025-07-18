'use client';

import { Suspense, useEffect, useMemo, useState } from 'react';

import { RepositoryPullRequestResponseType, RepositorySummaryType } from '@/__generated__/@types';
import { useGetEntirePullRequestsQuery, useGetPullRequestsQuery } from '@/apis/repositories/repositories.query';
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from '@/components/common/Pagination';
import EmptyListView from '@/components/common/StatusView/EmptyListView';
import Preview from '@/components/home/Preview';
import { PRContent, PRItem, PRStatus } from '@/components/home/PRItem';
import PreviewSkeleton from '@/components/home/Skeleton/PreviewSkeleton';
import PRListSkeleton from '@/components/home/Skeleton/PRListSkeleton';
import { usePagination } from '@/hooks/usePagination';

interface RepositoryListProps {
  repository: RepositorySummaryType;
}

const PAGE_SIZE = 5;

export default function RepositoryList({ repository }: RepositoryListProps) {
  const [pullRequestId, setPullRequestId] = useState<number>();
  const [currentPage, setCurrentPage] = useState(0);

  const { data: PRData, isLoading: isPRDataLoading } = useGetPullRequestsQuery({
    variables: {
      repositoryId: repository.id || 0,
      query: { page: currentPage, size: PAGE_SIZE },
    },
    options: { enabled: repository.id !== 0 },
  });

  const { data: entirePRData, isLoading: isEntirePRDataLoading } = useGetEntirePullRequestsQuery({
    variables: { query: { page: currentPage, size: PAGE_SIZE } },
    options: { enabled: repository.id === 0 },
  });

  const isLoading = repository.id !== 0 ? isPRDataLoading : isEntirePRDataLoading;
  const PRList = useMemo(
    () => (repository.id !== 0 ? PRData?.data.pullRequests || [] : entirePRData?.data.pullRequests || []),
    [PRData, entirePRData, repository.id],
  );

  const totalPage = Math.ceil((repository.pullRequestCount || 0) / PAGE_SIZE);
  const { pagesToShow } = usePagination({ totalPage, currentPage: currentPage + 1 });

  const handlePRItemOver = (pr: RepositoryPullRequestResponseType) => {
    setPullRequestId(pr.id);
  };

  useEffect(() => {
    if (PRList.length > 0) {
      setPullRequestId(PRList[0].id);
    } else {
      setPullRequestId(undefined);
    }
  }, [PRList]);

  if (isLoading) {
    return (
      <div className={'flex'}>
        <div className={'border-dark-grey-100 flex flex-1 flex-col gap-5 border-e-1 py-4 pe-8'}>
          <PRListSkeleton />
        </div>
        <PreviewSkeleton />
      </div>
    );
  }

  if (PRList.length === 0) {
    return <EmptyListView />;
  }

  return (
    <div className={'flex'}>
      <div className={'border-dark-grey-100 flex flex-1 flex-col gap-5 border-e-1 py-4 pe-8'}>
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
                onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 0))}
              />
            </PaginationItem>

            {pagesToShow.map((page, index) =>
              page === 'ellipsis' ? (
                <PaginationItem key={index === 0 ? 'ellipsis-left' : 'ellipsis-right'}>
                  <PaginationEllipsis />
                </PaginationItem>
              ) : (
                <PaginationItem key={`page-${page}`}>
                  <PaginationLink
                    isActive={currentPage === page - 1}
                    onClick={() => setCurrentPage(Number(page) - 1)}
                    className={`text-body-medium flex size-10 cursor-pointer items-center justify-center rounded-full transition-colors duration-100 ease-out ${currentPage === page - 1 ? 'bg-dark-grey-50 font-medium' : 'font-regular'}`}
                  >
                    {page}
                  </PaginationLink>
                </PaginationItem>
              ),
            )}

            <PaginationItem>
              <PaginationNext
                className={'flex size-10 items-center justify-center rounded-full'}
                onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPage - 1))}
              />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      </div>
      <Suspense fallback={<PreviewSkeleton />}>{pullRequestId && <Preview pullRequestId={pullRequestId} />}</Suspense>
    </div>
  );
}
