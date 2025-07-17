import { useQuery } from '@tanstack/react-query';

import { apiApi } from '@/__generated__/Api/Api.api';
import { UseQueryParams } from '@/types/tanstack-query/use-query-params';

export const USER_API_QUERY_KEY = {
  GET_MY_INFO: () => ['user', 'me'],
};

export const useGetMyInfoQuery = (params: UseQueryParams<typeof apiApi.getMyInfo>) => {
  const queryKey = USER_API_QUERY_KEY.GET_MY_INFO();
  return useQuery({
    queryKey,
    queryFn: () => apiApi.getMyInfo(),
    ...params?.options,
  });
};
