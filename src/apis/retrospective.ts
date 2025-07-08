import type { PullRequestReadResponseType, UserType } from '@/__generated__/@types';
import { apiApi } from '@/__generated__/Api/Api.api';

export async function fetchPullRequestById(
  pullRequestId: number,
  user: UserType,
): Promise<PullRequestReadResponseType> {
  const res = await apiApi.getPullRequest({
    pullRequestId,
    query: { user },
  });
  return res.data;
}

export async function markPRAsDone(pullRequestId: number, user: UserType): Promise<void> {
  try {
    await apiApi.pullRequestUpdateToDone({
      pullRequestId,
      query: { user },
    });
  } catch (error: any) {
    const message = error.response?.data?.message || 'PR 회고 완료 요청 실패';
    throw new Error(message);
  }
}
