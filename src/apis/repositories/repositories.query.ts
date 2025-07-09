import { useQuery } from '@tanstack/react-query';

import { apiApi } from '@/__generated__/Api/Api.api';
import { UseQueryParams } from '@/types/tanstack-query/use-query-params';
import { isNotNull } from '@/types/utility/is-not-null';
import { Parameter } from '@/types/utility/parameter';

export const REPOSITORIES_API_QUERY_KEY = {
  GET_PULL_REQUESTS: (params?: Parameter<typeof apiApi.getRepositoryPullRequests>) =>
    ['repositories', params].filter(isNotNull),
};

export const useGetPullRequestsQuery = (params: UseQueryParams<typeof apiApi.getRepositoryPullRequests>) => {
  const queryKey = REPOSITORIES_API_QUERY_KEY.GET_PULL_REQUESTS(params?.variables);

  return useQuery({
    queryKey,
    queryFn: () => apiApi.getRepositoryPullRequests(params?.variables),
    ...params?.options,
  });
};
