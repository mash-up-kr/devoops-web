'use client';

import Link from 'next/link';
import { Dispatch, SetStateAction, useEffect } from 'react';

import { RepositoryPullRequestResponseType } from '@/__generated__/@types';
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
import { ActiveCategoryIndexesType } from '@/components/home/Overview';
import { PRContent, PRItem, PRStatus } from '@/components/home/PRItem';
import { ROUTES } from '@/constants/routes';
import { usePagination } from '@/hooks/home/usePagination';

interface PRListProps {
  prListData: RepositoryPullRequestResponseType[];
  totalPage: number;
  pullRequestIdAction: Dispatch<SetStateAction<number | undefined>>;
  currentPage: number;
  currentPageAction: Dispatch<SetStateAction<number>>;
  activeCategoryIndexesAction: Dispatch<SetStateAction<ActiveCategoryIndexesType>>;
}

export function PRList({
  prListData,
  totalPage,
  pullRequestIdAction,
  currentPage,
  currentPageAction,
  activeCategoryIndexesAction,
}: PRListProps) {
  const { pagesToShow } = usePagination({ totalPage, currentPage: currentPage + 1 });

  const handlePRItemOver = (pr: RepositoryPullRequestResponseType) => {
    pullRequestIdAction(pr.id);
  };

  const handlePageChange = (newPage: number) => {
    pullRequestIdAction(undefined);
    currentPageAction(newPage);
  };

  useEffect(() => {
    if (prListData.length === 0) {
      pullRequestIdAction(undefined);
      activeCategoryIndexesAction({});
      return;
    }

    // PR 별 카테고리 선택을 유지하기 위함.
    activeCategoryIndexesAction((prevIndexes) => {
      const newIndexes = { ...prevIndexes };
      prListData.forEach((pr) => {
        if (pr.id !== undefined && newIndexes[pr.id] === undefined) {
          newIndexes[pr.id] = 0;
        }
      });
      return newIndexes;
    });
  }, [prListData]);

  if (prListData.length === 0) {
    return (
      <div className={'w-full'}>
        <EmptyListView />
      </div>
    );
  }

  return (
    <div className={'max-w-pr-item border-dark-grey-100 flex flex-1 flex-col gap-5 border-e-1 py-4 pe-8'}>
      {prListData.map((pr) => (
        <Link href={ROUTES.PAGE.RETROSPECTIVE(pr.id || 0)} key={pr.id}>
          <PRItem onMouseOver={() => handlePRItemOver(pr)}>
            <PRStatus status={pr.recordStatus} />
            <PRContent content={pr.title} label={pr.tag || 'none'} />
          </PRItem>
        </Link>
      ))}
      <Pagination>
        <PaginationContent>
          <PaginationItem>
            <PaginationPrevious
              className={'flex size-10 items-center justify-center rounded-full'}
              onClick={() => handlePageChange(Math.max(currentPage - 1, 0))}
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
                  onClick={() => handlePageChange(Number(page) - 1)}
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
              onClick={() => handlePageChange(Math.min(currentPage + 1, totalPage - 1))}
            />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </div>
  );
}
