import { apiApi } from '@/__generated__/Api/Api.api';
import MyPR from '@/components/home/MyPR';

export default async function Home() {
  const { data: myReposRes } = await apiApi.getMyRepositories({ data: { url: '' } });

  const repos = myReposRes.repositories ?? [];
  const totalCount = repos.reduce((sum, r) => sum + (r.pullRequestCount || 0), 0);
  const initialRepositoryList = [{ id: 0, name: '전체', pullRequestCount: totalCount }, ...repos];

  return (
    <div className={'mx-auto max-w-[1200px] px-[40px]'}>
      <MyPR initialRepositoryList={initialRepositoryList} />
    </div>
  );
}
