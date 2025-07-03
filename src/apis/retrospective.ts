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
