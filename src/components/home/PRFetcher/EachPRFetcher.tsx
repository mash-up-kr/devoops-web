'use client';

import { ReactNode } from 'react';

import { RepositorySummaryType } from '@/__generated__/@types';
import { useGetPullRequestsQuery } from '@/apis/repositories/repositories.query';
import { ITEMS_PER_PAGE } from '@/constants/domain';

interface EachPRFetcherProps {
  repository: RepositorySummaryType;
  currentPage: number;
  renderAction: (data: any) => ReactNode;
}

export function EachPRFetcher({ repository, currentPage, renderAction }: EachPRFetcherProps) {
  const { data } = useGetPullRequestsQuery({
    variables: {
      repositoryId: repository.id || 0,
      query: { page: currentPage, size: ITEMS_PER_PAGE },
    },
    options: { staleTime: 0, refetchOnMount: 'always' },
  });

  return renderAction(data.data.pullRequests);
}
