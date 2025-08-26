import { RepositorySummaryType } from '@/__generated__/@types';
import { apiApi } from '@/__generated__/Api/Api.api';
import MyPR from '@/components/home/MyPR';

export default async function Home() {
  let initialRepositoryList: RepositorySummaryType[];

  try {
    const { data: myReposRes } = await apiApi.getMyRepositories();
    const repos = myReposRes.repositories ?? [];

    const totalCount = repos.reduce((sum, r) => sum + (r.pullRequestCount || 0), 0);
    initialRepositoryList = [{ id: 0, name: '전체', pullRequestCount: totalCount }, ...repos];
  } catch {
    initialRepositoryList = [];
  }

  return (
    <div className={'mx-auto max-w-[1200px] px-[40px]'}>
      <MyPR initialRepositoryList={initialRepositoryList} />
    </div>
  );
}
