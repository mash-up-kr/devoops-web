import { RepositorySummaryType } from '@/__generated__/@types';

export function sortRepositoriesByTracking(repositories: RepositorySummaryType[]) {
  return repositories.sort((a, b) => Number(Boolean(b?.isTracking)) - Number(Boolean(a?.isTracking)));
}
