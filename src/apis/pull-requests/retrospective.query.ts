import type { PullRequestReadResponseType } from '@/__generated__/@types';

export async function fetchPullRequestById(
  pullRequestId: number,
  accessToken: string,
): Promise<PullRequestReadResponseType> {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL || ''}/api/pull-requests/${pullRequestId}`, {
    method: 'GET',
    headers: {
      Accept: 'application/json',
      Authorization: `Bearer ${accessToken}`,
    },
  });
  if (!res.ok) throw new Error('PR 상세 조회 실패');
  return res.json();
}
