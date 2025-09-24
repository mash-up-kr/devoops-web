'use client';

import { ReactNode } from 'react';

import { useGetEntirePullRequestsQuery } from '@/apis/repositories/repositories.query';
import { ITEMS_PER_PAGE } from '@/constants/domain';

interface EntirePRFetcherProps {
  currentPage: number;
  renderAction: (data: any) => ReactNode;
}

export function EntirePRFetcher({ currentPage, renderAction }: EntirePRFetcherProps) {
  const { data } = useGetEntirePullRequestsQuery({
    variables: { query: { page: currentPage, size: ITEMS_PER_PAGE } },
    options: { staleTime: 0, refetchOnMount: 'always' },
  });

  return renderAction(data.data.pullRequests);
}
