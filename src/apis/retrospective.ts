export interface Question {
  questionId: number;
  category: string;
  content: string;
  isSelected: boolean;
  answerId: number | null;
  answer: string | null;
}

export interface PullRequestDetail {
  id: number;
  title: string;
  tag: string;
  recordStatus: 'PENDING' | 'PROGRESS' | 'DONE';
  mergedAt: string;
  summary: string;
  categories: string[];
  questions: Question[];
}

export interface CategoryWithQuestions {
  category: string;
  questions: {
    questionId: number;
    question: string;
  }[];
}

export async function fetchPullRequestById(pullRequestId: string, accessToken: string): Promise<PullRequestDetail> {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/pull-requests/${pullRequestId}`, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
    cache: 'no-store',
  });

  if (!res.ok) {
    throw new Error('PR 정보 조회 실패');
  }

  return res.json();
}

export async function markPRAsDone(pullRequestId: string): Promise<void> {
  const response = await fetch(`/api/pull-requests/${pullRequestId}/done`, {
    // const response = await fetch(`https://api.dev-oops.kr/api/pull-requests/${pullRequestId}/done`, {
    method: 'PATCH',
    headers: {
      // Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
      // 'Content-Type': 'application/json',
    },
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || 'PR 회고 완료 요청 실패');
  }
}
