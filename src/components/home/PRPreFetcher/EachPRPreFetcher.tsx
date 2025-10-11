import { dehydrate, HydrationBoundary } from '@tanstack/react-query';
import { ReactNode } from 'react';

import { apiApi } from '@/__generated__/Api/Api.api';
import { REPOSITORIES_API_QUERY_KEY } from '@/apis/repositories/repositories.query';
import { ITEMS_PER_PAGE } from '@/constants/domain';
import getQueryClient from '@/providers/getQueryClient';

interface EachPRPreFetcherProps {
  repositoryId: number | undefined;
  children: ReactNode;
}

export async function EachPRPreFetcher({ repositoryId, children }: EachPRPreFetcherProps) {
  const queryClient = getQueryClient();

  if (repositoryId) {
    await queryClient.prefetchQuery({
      queryKey: REPOSITORIES_API_QUERY_KEY.GET_PULL_REQUESTS({
        repositoryId: repositoryId ?? 0,
        query: { page: 0, size: ITEMS_PER_PAGE },
      }),
      queryFn: async () => {
        const res = await apiApi.getRepositoryPullRequests({
          repositoryId: repositoryId ?? 0,
          query: { page: 0, size: ITEMS_PER_PAGE },
        });

        return { data: res.data };
      },
    });
  }

  return <HydrationBoundary state={dehydrate(queryClient)}>{children}</HydrationBoundary>;
}
