import { useQuery } from '@tanstack/react-query';

import { apiApi } from '@/__generated__/Api/Api.api';
import { UseQueryParams } from '@/types/tanstack-query/use-query-params';
import { isNotNull } from '@/types/utility/is-not-null';
import { Parameter } from '@/types/utility/parameter';

export const REPOSITORIES_API_QUERY_KEY = {
  GET_REPOSITORIES_ME: () => ['repositories', 'me'].filter(isNotNull),
  GET_REPOSITORY_ENTIRE_PULL_REQUESTS: (params?: Parameter<typeof apiApi.getRepositoryEntirePullRequests>) =>
    ['entire-pull-requests', params].filter(isNotNull),
  GET_PULL_REQUESTS: (params?: Parameter<typeof apiApi.getRepositoryPullRequests>) =>
    ['pull-requests', params].filter(isNotNull),
  GET_PULL_REQUEST: (params?: Parameter<typeof apiApi.getPullRequest>) => ['pull-request', params].filter(isNotNull),
};

export const useRepositoriesMeQuery = (params: UseQueryParams<typeof apiApi.getMyRepositories>) => {
  const queryKey = REPOSITORIES_API_QUERY_KEY.GET_REPOSITORIES_ME();
  return useQuery({
    queryKey,
    queryFn: () => apiApi.getMyRepositories({}),
    ...params?.options,
  });
};

export const useGetEntirePullRequestsQuery = (
  params: UseQueryParams<typeof apiApi.getRepositoryEntirePullRequests>,
) => {
  const queryKey = REPOSITORIES_API_QUERY_KEY.GET_REPOSITORY_ENTIRE_PULL_REQUESTS(params?.variables);

  return useQuery({
    queryKey,
    queryFn: () => apiApi.getRepositoryEntirePullRequests(params?.variables),
    ...params?.options,
  });
};

export const useGetPullRequestsQuery = (params: UseQueryParams<typeof apiApi.getRepositoryPullRequests>) => {
  const queryKey = REPOSITORIES_API_QUERY_KEY.GET_PULL_REQUESTS(params?.variables);

  return useQuery({
    queryKey,
    queryFn: () => apiApi.getRepositoryPullRequests(params?.variables),
    ...params?.options,
  });
};

export const useGetPullRequestQuery = (params: UseQueryParams<typeof apiApi.getPullRequest>) => {
  const queryKey = REPOSITORIES_API_QUERY_KEY.GET_PULL_REQUEST(params?.variables);

  return useQuery({
    queryKey,
    queryFn: () => apiApi.getPullRequest(params?.variables),
    ...params?.options,
  });
};
