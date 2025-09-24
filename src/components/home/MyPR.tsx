import { dehydrate, HydrationBoundary, QueryClient } from '@tanstack/react-query';

import { RepositorySummaryType } from '@/__generated__/@types';
import { apiApi } from '@/__generated__/Api/Api.api';
import { REPOSITORIES_API_QUERY_KEY } from '@/apis/repositories/repositories.query';
import { RepolinkButton, RepolinkModal } from '@/components/common/Modal/RepolinkModal';
import Spacing from '@/components/common/Spacing';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/common/Tabs';
import Overview from '@/components/home/Overview';
import { RepositoryTrigger } from '@/components/home/RepositoryTrigger';
import { ITEMS_PER_PAGE } from '@/constants/domain';
import { sortRepositoriesByTracking } from '@/utils/sortRepositoriesByTracking';

export const prepareRepositories = (repositories: RepositorySummaryType[]) => {
  const sortedRepositoriesByTracking = sortRepositoriesByTracking(repositories);
  const totalCount = repositories.reduce((total, repository) => total + (repository.pullRequestCount || 0), 0);

  return [{ id: 0, name: '전체', pullRequestCount: totalCount }, ...sortedRepositoriesByTracking];
};

export async function MyPR() {
  const queryClient = new QueryClient();
  await queryClient.prefetchQuery({
    queryKey: REPOSITORIES_API_QUERY_KEY.GET_REPOSITORY_ENTIRE_PULL_REQUESTS({
      query: { page: 0, size: ITEMS_PER_PAGE },
    }),
    queryFn: async () => {
      const res = await apiApi.getRepositoryEntirePullRequests({
        query: { page: 0, size: ITEMS_PER_PAGE },
      });

      return { data: res.data };
    },
  });

  const { data: myRepositories } = await apiApi.getMyRepositories();
  const repositories = myRepositories.repositories ?? [];
  const initRepositories = prepareRepositories(repositories);

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <div>
        <h1 className={'text-h1 blue-tiny-left inline-block pt-2.5 pb-6 font-semibold'}>{'내 PR'}</h1>
        <Tabs defaultValue={initRepositories[0]?.name || ''}>
          <div className={'border-dark-grey-100 border-b-1'}>
            <TabsList aria-label={'내 PR 목록'}>
              {initRepositories.map((repository) => (
                <TabsTrigger key={repository.id} value={repository.name || ''}>
                  <RepositoryTrigger repository={repository} />
                </TabsTrigger>
              ))}
              <RepolinkButton action={'OPEN'} />
            </TabsList>
          </div>
          {initRepositories.map((repository) => (
            <TabsContent key={repository.id} value={repository.name || ''}>
              <Overview repository={repository} />
            </TabsContent>
          ))}
        </Tabs>
        <Spacing size={400} />
      </div>
      <RepolinkModal defaultOpen={false} isOutsideClickClose button={null} />
    </HydrationBoundary>
  );
}
