import axios from 'axios';

import type { PullRequestDetail } from '@/types/retrospective';

export async function fetchPullRequestById(pullRequestId: string, accessToken: string): Promise<PullRequestDetail> {
  try {
    // const res = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/api/pull-requests/${pullRequestId}`, {
    const res = await axios.get(`/api/pull-requests/${pullRequestId}`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    return res.data;
  } catch (error: any) {
    const message = error.response?.data?.message || 'PR 정보 조회 실패';
    throw new Error(message);
  }
}

export async function markPRAsDone(pullRequestId: string): Promise<void> {
  try {
    // await axios.patch(`https://api.dev-oops.kr/api/pull-requests/${pullRequestId}/done`, {}, {
    await axios.patch(
      `/api/pull-requests/${pullRequestId}/done`,
      {},
      {
        headers: {
          // Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
          // 'Content-Type': 'application/json',
        },
      },
    );
  } catch (error: any) {
    const message = error.response?.data?.message || 'PR 회고 완료 요청 실패';
    throw new Error(message);
  }
}
