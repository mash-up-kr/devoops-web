import dynamic from 'next/dynamic';

import { repositoriesApi } from '@/apis/repositories/repositories.api';
import { MyPRContent } from '@/components/home/MyPRContent';
import { EachPRPreFetcher } from '@/components/home/PRPreFetcher/EachPRPreFetcher';
import { EntirePRPreFetcher } from '@/components/home/PRPreFetcher/EntirePRPreFetcher';
import { TOTAL_TABS } from '@/constants/domain';

const RepolinkModal = dynamic(() =>
  import('@/components/common/Modal/RepolinkModal').then((module) => module.RepolinkModal),
);

interface MyPRProps {
  searchParams?: { tab?: string };
}

export async function MyPR({ searchParams }: MyPRProps) {
  const initRepositories = await repositoriesApi.getRepositories();

  const currentTab = searchParams?.tab || TOTAL_TABS.NAME;
  const isTotalTab = currentTab === TOTAL_TABS.NAME;

  const currentRepository = initRepositories.find((repository) => repository.name === currentTab);
  const currentRepositoryId = currentRepository?.id || TOTAL_TABS.ID;

  const PRPreFetcher = isTotalTab ? EntirePRPreFetcher : EachPRPreFetcher;

  return (
    <PRPreFetcher repositoryId={currentRepositoryId}>
      <MyPRContent initRepositories={initRepositories} currentTab={currentTab} />
      <RepolinkModal defaultOpen={false} isOutsideClickClose button={null} />
    </PRPreFetcher>
  );
}
