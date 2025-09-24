import { RepositorySummaryType } from '@/__generated__/@types';

interface RepositoryTriggerProps {
  repository: RepositorySummaryType;
}

export function RepositoryTrigger({ repository }: RepositoryTriggerProps) {
  return (
    <>
      <p>{repository.name}</p>
      <p className={'text-dark-grey-500'}>{repository.pullRequestCount}</p>
    </>
  );
}
