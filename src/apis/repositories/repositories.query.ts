import { useQuery } from '@tanstack/react-query';

import { apiApi } from '@/__generated__/Api/Api.api';
import { UseQueryParams } from '@/types/tanstack-query/use-query-params';
import { isNotNull } from '@/types/utility/is-not-null';

export const REPOSITORIES_API_QUERY_KEY = {
  GET_REPOSITORIES_ME: () => ['repositories', 'me'].filter(isNotNull),
};

export const useRepositoriesMeQuery = (params: UseQueryParams<typeof apiApi.getMyRepositories>) => {
  const queryKey = REPOSITORIES_API_QUERY_KEY.GET_REPOSITORIES_ME();
  return useQuery({
    queryKey,
    queryFn: () => apiApi.getMyRepositories({ data: { url: '' } }),
    ...params?.options,
  });
};
