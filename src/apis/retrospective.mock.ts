import type { PullRequestDetail } from './retrospective';

const mockData: Record<string, PullRequestDetail> = {
  test123: {
    id: 123,
    title: '회고 기능 리팩터링',
    tag: 'refactor',
    recordStatus: 'PROGRESS',
    mergedAt: '2025-07-03',
    summary: '이 PR은 회고 기능을 리팩터링합니다.\n코드 구조를 개선하고 컴포넌트를 재사용 가능하게 변경했습니다.',
    categories: ['회고 질문'],
    questions: [
      {
        questionId: 1,
        category: '회고 질문',
        content: '가장 어려웠던 점은 무엇이었나요?',
        isSelected: true,
        answerId: 101,
        answer: '기존 컴포넌트와 호환성을 유지하면서 리팩터링하는 게 까다로웠어요.',
      },
      {
        questionId: 2,
        category: '회고 질문',
        content: '개선할 수 있었던 부분은 무엇인가요?',
        isSelected: false,
        answerId: null,
        answer: null,
      },
    ],
  },

  feat456: {
    id: 456,
    title: '기능 추가: 회고 작성 저장 기능',
    tag: 'feature',
    recordStatus: 'DONE',
    mergedAt: '2025-06-28',
    summary: '회고 작성 내용을 로컬 상태에 저장하고 제출 시 서버로 전송하는 기능을 추가했습니다.',
    categories: ['개발 경험', 'UX'],
    questions: [
      {
        questionId: 3,
        category: '개발 경험',
        content: '이 기능을 개발하면서 배운 점은 무엇인가요?',
        isSelected: true,
        answerId: 201,
        answer: '로컬 상태를 전역으로 관리할 때의 장단점을 경험했습니다.',
      },
      {
        questionId: 4,
        category: 'UX',
        content: '사용자 경험을 위해 고려한 부분은 무엇인가요?',
        isSelected: true,
        answerId: 202,
        answer: '입력 중에도 데이터를 유지시켜 사용자가 실수해도 복구 가능하게 했습니다.',
      },
    ],
  },

  bug789: {
    id: 789,
    title: '버그 수정: 질문 미출력 현상',
    tag: 'bugfix',
    recordStatus: 'PENDING',
    mergedAt: '2025-07-01',
    summary: '선택된 질문만 출력되는 문제가 있어 전체 질문이 보이도록 수정했습니다.',
    categories: ['디버깅', '테스트'],
    questions: [
      {
        questionId: 5,
        category: '디버깅',
        content: '어떤 버그였고 어떻게 해결했나요?',
        isSelected: true,
        answerId: 301,
        answer: '조건 필터링 로직이 잘못되어 전체 질문이 필터링되고 있었어요.',
      },
      {
        questionId: 6,
        category: '테스트',
        content: '테스트 커버리지를 어떻게 보완했나요?',
        isSelected: false,
        answerId: null,
        answer: null,
      },
    ],
  },
};

export async function fetchMockPullRequestById(pullRequestId: string): Promise<PullRequestDetail> {
  return new Promise((resolve, reject) => {
    const data = mockData[pullRequestId];

    if (!data) {
      reject(new Error(`Mock data not found for PR ID: ${pullRequestId}`));
    } else {
      resolve(data);
    }
  });
}
