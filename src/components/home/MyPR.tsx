import { apiApi } from '@/__generated__/Api/Api.api';
import { RepolinkButton, RepolinkModal } from '@/components/common/Modal/RepolinkModal';
import Spacing from '@/components/common/Spacing';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/common/Tabs';
import Overview from '@/components/home/Overview';
import { sortRepositoriesByTracking } from '@/utils/sortRepositoriesByTracking';

export async function MyPR() {
  const { data: myRepositories } = await apiApi.getMyRepositories();

  const repositoriesData = myRepositories.repositories ?? [];
  const sortedRepositoriesByTracking = sortRepositoriesByTracking(repositoriesData);
  const totalCount = repositoriesData.reduce((total, repository) => total + (repository.pullRequestCount || 0), 0);
  const initialRepositoryList = [
    { id: 0, name: '전체', pullRequestCount: totalCount },
    ...sortedRepositoriesByTracking,
  ];

  return (
    <>
      <div>
        <h1 className={'text-h1 blue-tiny-left inline-block pt-2.5 pb-6 font-semibold'}>{'내 PR'}</h1>
        <Tabs defaultValue={initialRepositoryList[0]?.name || ''}>
          <div className={'border-dark-grey-100 border-b-1'}>
            <TabsList aria-label={'내 PR 목록'}>
              {initialRepositoryList.map((repository) => (
                <TabsTrigger key={repository.id} value={repository.name || ''}>
                  <p>{repository.name}</p>
                  <p className={'text-dark-grey-500'}>{repository.pullRequestCount}</p>
                </TabsTrigger>
              ))}
              <RepolinkButton action={'OPEN'} />
            </TabsList>
          </div>
          <div>
            {initialRepositoryList.map((repository) => (
              <TabsContent key={repository.id} value={repository.name || ''}>
                <Overview repository={repository} />
              </TabsContent>
            ))}
          </div>
        </Tabs>
        <Spacing size={400} />
      </div>
      <RepolinkModal defaultOpen={false} isOutsideClickClose button={null} />
    </>
  );
}
