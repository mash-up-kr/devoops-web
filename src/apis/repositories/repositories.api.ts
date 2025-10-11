import { RepositorySummaryType } from '@/__generated__/@types';
import { apiApi } from '@/__generated__/Api/Api.api';
import { TOTAL_TABS } from '@/constants/domain';
import { sortRepositoriesByTracking } from '@/utils/sortRepositoriesByTracking';

export const prepareRepositories = (repositories: RepositorySummaryType[]) => {
  const sortedRepositoriesByTracking = sortRepositoriesByTracking(repositories);
  const totalCount = repositories.reduce((total, repository) => total + (repository.pullRequestCount || 0), 0);

  return [{ id: TOTAL_TABS.ID, name: TOTAL_TABS.NAME, pullRequestCount: totalCount }, ...sortedRepositoriesByTracking];
};

class RepositoriesApi {
  async getRepositories() {
    try {
      const { data: myRepositories } = await apiApi.getMyRepositories();
      const repositories = myRepositories.repositories ?? [];
      return prepareRepositories(repositories);
    } catch {
      return [{ id: TOTAL_TABS.ID, name: TOTAL_TABS.NAME, pullRequestCount: 0 }];
    }
  }
}

export const repositoriesApi = new RepositoriesApi();
