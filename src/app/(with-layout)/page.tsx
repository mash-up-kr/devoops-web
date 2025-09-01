import { RepositorySummaryType } from '@/__generated__/@types';
import { apiApi } from '@/__generated__/Api/Api.api';
import MyPR from '@/components/home/MyPR';
import { sortRepositoriesByTracking } from '@/utils/sortRepositoriesByTracking';

export default async function Home() {
  let initialRepositoryList: RepositorySummaryType[];

  try {
    const { data: myRepositories } = await apiApi.getMyRepositories();
    const repositoriesData = myRepositories.repositories ?? [];
    const sortedRepositoriesByTracking = sortRepositoriesByTracking(repositoriesData);
    console.log(sortedRepositoriesByTracking);

    const totalCount = repositoriesData.reduce((sum, r) => sum + (r.pullRequestCount || 0), 0);
    initialRepositoryList = [{ id: 0, name: '전체', pullRequestCount: totalCount }, ...sortedRepositoriesByTracking];
  } catch {
    initialRepositoryList = [];
  }

  return (
    <div className={'mx-auto max-w-[1200px] px-[40px]'}>
      <MyPR initialRepositoryList={initialRepositoryList} />
    </div>
  );
}
