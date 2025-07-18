import { useQuery } from '@tanstack/react-query';

import { apiApi } from '@/__generated__/Api/Api.api';
import { UseQueryParams } from '@/types/tanstack-query/use-query-params';

const QUERY_KEY = {
  PULL_REQUEST_DETAIL: (pullRequestId: number) => ['pullRequestDetail', pullRequestId],
};

export const useGetDetailPullRequestQuery = (params: UseQueryParams<typeof apiApi.getDetailPullRequest>) => {
  return useQuery({
    queryKey: QUERY_KEY.PULL_REQUEST_DETAIL(params.variables.pullRequestId),
    queryFn: () => {
      return apiApi.getDetailPullRequest({ pullRequestId: params.variables.pullRequestId });
    },
    ...params.options,
  });
};
