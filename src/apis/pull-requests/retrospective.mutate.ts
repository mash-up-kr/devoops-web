export async function markPRAsDone(pullRequestId: number, accessToken: string): Promise<void> {
  const res = await fetch(`https://api.dev-oops.kr/api/pull-requests/${pullRequestId}/done`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${accessToken}`,
    },
    credentials: 'include',
  });
  if (!res.ok) {
    const error = await res.json().catch(() => ({}));
    throw new Error(error.message || 'PR 회고 완료 요청 실패');
  }
}

export async function submitRetrospectiveAnswers(
  accessToken: string,
  answers: { answerId: number; content: string }[],
) {
  const res = await fetch('https://api.dev-oops.kr/api/questions/answer', {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${accessToken}`,
    },
    body: JSON.stringify({ answers }),
    credentials: 'include',
  });

  if (!res.ok) {
    const error = await res.json().catch(() => ({}));
    throw new Error(error.message || '회고 답변 저장 실패');
  }

  return res.json();
}

export async function createRetrospectiveAnswer(questionId: number, accessToken: string) {
  const res = await fetch(`https://api.dev-oops.kr/api/questions/${questionId}/answer`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${accessToken}`,
    },
    credentials: 'include',
  });
  if (!res.ok) {
    const error = await res.json().catch(() => ({}));
    throw new Error(error.message || '회고 생성 실패');
  }
  return res.json();
}

export async function updateRetrospectiveAnswer(answerId: number, content: string, accessToken: string) {
  const res = await fetch(`https://api.dev-oops.kr/api/questions/answer/${answerId}`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${accessToken}`,
    },
    body: JSON.stringify({ content }),
    credentials: 'include',
  });
  if (!res.ok) {
    const error = await res.json().catch(() => ({}));
    throw new Error(error.message || '회고 답변 수정 실패');
  }
  return res.json();
}
